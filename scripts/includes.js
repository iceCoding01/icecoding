document.addEventListener('DOMContentLoaded', async () => {
    // Load header/navbar include
    const headerTarget = document.getElementById('site-header');
    if (headerTarget) {
        try {
            const resp = await fetch('includes/navbar.html', { cache: 'no-cache' });
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
            const response = await fetch('includes/footer.html', { cache: 'no-cache' });
            if (!response.ok) {
                throw new Error(`Failed to load footer include: ${response.status}`);
            }

            const html = await response.text();
            footerTarget.innerHTML = html;
        } catch (error) {
            console.error('Footer include load error:', error);
        }
    }
});
