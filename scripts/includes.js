document.addEventListener('DOMContentLoaded', async () => {
    // Load header/navbar include
    const cacheBuster = Date.now();
    const headerTarget = document.getElementById('site-header');
    if (headerTarget) {
        try {
            const resp = await fetch(`includes/navbar.html?cb=${cacheBuster}`, { cache: 'reload' });
            if (resp.ok) {
                headerTarget.innerHTML = await resp.text();
            } else {
                console.error('Failed to load navbar include:', resp.status);
            }
        } catch (e) {
            console.error('Navbar include load error:', e);
        }
    }

    // Load footer include
    const footerTarget = document.getElementById('site-footer');
    if (footerTarget) {
        try {
            const response = await fetch(`includes/footer.html?cb=${cacheBuster}`, { cache: 'reload' });
            if (!response.ok) {
                throw new Error(`Failed to load footer include: ${response.status}`);
            }

            const html = await response.text();
            footerTarget.innerHTML = html;
        } catch (error) {
            console.error('Footer include load error:', error);
        }
    }

    // Dispatch an event after includes are loaded so page scripts can initialize page-dependent header behavior
    window.dispatchEvent(new Event('includesLoaded'));
});
