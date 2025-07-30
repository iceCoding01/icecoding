// Service Worker for ICECODING Website Performance
const CACHE_NAME = 'icecoding-v1.0.0';
const STATIC_CACHE_NAME = 'icecoding-static-v1.0.0';
const DYNAMIC_CACHE_NAME = 'icecoding-dynamic-v1.0.0';

// Cache essential resources
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/styles/main.css',
    '/styles/components.css',
    '/styles/performance.css',
    '/styles/tailwind.css',
    '/scripts/main.js',
    '/assets/images/logo.png',
    '/assets/images/brand pattern.png',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
    'https://fonts.googleapis.com/icon?family=Material+Icons&display=swap',
    'https://cdn.tailwindcss.com'
];

// Cache strategies
const CACHE_STRATEGIES = {
    // Cache First (for static assets)
    cacheFirst: ['css', 'js', 'woff2', 'woff', 'ttf', 'eot'],
    // Network First (for HTML and dynamic content)
    networkFirst: ['html', 'json', 'xml'],
    // Stale While Revalidate (for images)
    staleWhileRevalidate: ['png', 'jpg', 'jpeg', 'svg', 'gif', 'webp']
};

// Install event
self.addEventListener('install', event => {
    console.log('Service Worker: Installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('Service Worker: Static assets cached');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('Service Worker: Cache installation failed', error);
            })
    );
});

// Activate event
self.addEventListener('activate', event => {
    console.log('Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        // Delete old caches
                        if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
                            console.log('Service Worker: Deleting old cache', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker: Activated');
                return self.clients.claim();
            })
    );
});

// Fetch event
self.addEventListener('fetch', event => {
    const request = event.request;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip chrome-extension and other non-http(s) requests
    if (!url.protocol.startsWith('http')) {
        return;
    }
    
    // Determine cache strategy based on file extension
    const fileExtension = getFileExtension(url.pathname);
    const strategy = getCacheStrategy(fileExtension);
    
    event.respondWith(
        handleRequest(request, strategy)
    );
});

// Get file extension from URL
function getFileExtension(pathname) {
    return pathname.split('.').pop().toLowerCase();
}

// Determine cache strategy
function getCacheStrategy(extension) {
    if (CACHE_STRATEGIES.cacheFirst.includes(extension)) {
        return 'cacheFirst';
    } else if (CACHE_STRATEGIES.networkFirst.includes(extension)) {
        return 'networkFirst';
    } else if (CACHE_STRATEGIES.staleWhileRevalidate.includes(extension)) {
        return 'staleWhileRevalidate';
    } else {
        return 'networkFirst'; // Default strategy
    }
}

// Handle requests based on strategy
async function handleRequest(request, strategy) {
    switch (strategy) {
        case 'cacheFirst':
            return cacheFirst(request);
        case 'networkFirst':
            return networkFirst(request);
        case 'staleWhileRevalidate':
            return staleWhileRevalidate(request);
        default:
            return networkFirst(request);
    }
}

// Cache First strategy
async function cacheFirst(request) {
    try {
        const cache = await caches.open(STATIC_CACHE_NAME);
        const cachedResponse = await cache.match(request);
        
        if (cachedResponse) {
            return cachedResponse;
        }
        
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.error('Cache First strategy failed:', error);
        return new Response('Offline content not available', { status: 503 });
    }
}

// Network First strategy
async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.log('Network failed, trying cache:', error);
        
        const cache = await caches.open(DYNAMIC_CACHE_NAME);
        const cachedResponse = await cache.match(request);
        
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Return offline page for HTML requests
        if (request.headers.get('accept').includes('text/html')) {
            return caches.match('/offline.html') || new Response('Offline', { status: 503 });
        }
        
        return new Response('Network error occurred', { status: 503 });
    }
}

// Stale While Revalidate strategy
async function staleWhileRevalidate(request) {
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    // Fetch from network in background
    const networkResponsePromise = fetch(request)
        .then(networkResponse => {
            if (networkResponse.ok) {
                cache.put(request, networkResponse.clone());
            }
            return networkResponse;
        })
        .catch(error => {
            console.log('Background fetch failed:', error);
        });
    
    // Return cached version immediately if available, otherwise wait for network
    return cachedResponse || networkResponsePromise;
}

// Background sync for form submissions
self.addEventListener('sync', event => {
    if (event.tag === 'contact-form-sync') {
        event.waitUntil(syncContactForm());
    }
});

// Sync contact form data when online
async function syncContactForm() {
    try {
        // Retrieve queued form data from IndexedDB
        const queuedForms = await getQueuedForms();
        
        for (const formData of queuedForms) {
            try {
                await submitForm(formData);
                await removeFromQueue(formData.id);
                console.log('Form synced successfully');
            } catch (error) {
                console.error('Form sync failed:', error);
            }
        }
    } catch (error) {
        console.error('Background sync failed:', error);
    }
}

// Push notification handling
self.addEventListener('push', event => {
    if (!event.data) return;
    
    const data = event.data.json();
    const options = {
        body: data.body,
        icon: '/assets/images/logo.png',
        badge: '/assets/images/badge.png',
        vibrate: [100, 50, 100],
        data: {
            url: data.url || '/'
        },
        actions: [
            {
                action: 'explore',
                title: 'Explore',
                icon: '/assets/images/explore-icon.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/assets/images/close-icon.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// Notification click handling
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow(event.notification.data.url)
        );
    }
});

// Helper functions for IndexedDB operations
async function getQueuedForms() {
    // Implementation would depend on your IndexedDB setup
    return [];
}

async function removeFromQueue(id) {
    // Implementation would depend on your IndexedDB setup
    return Promise.resolve();
}

async function submitForm(formData) {
    // Implementation would submit form to your backend
    return fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
}
