document.addEventListener('DOMContentLoaded', async () => {
    const footerTarget = document.getElementById('site-footer');
    if (!footerTarget) {
        return;
    }

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
});
