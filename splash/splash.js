document.addEventListener('DOMContentLoaded', () => {
    const mainPage = '../index.html';
    const transitionDuration = 3000; // زيادة المدة قليلاً للانتقال السلس
    
    const splashContent = document.querySelector('.splash-content');
    if (!splashContent) return;

    splashContent.style.opacity = '1';
    
    setTimeout(() => {
        splashContent.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        splashContent.style.opacity = '0';
        splashContent.style.transform = 'scale(0.95) translateY(-10px)';
        
        setTimeout(() => {
            try {
                window.location.href = mainPage;
            } catch (error) {
                console.error('Navigation failed:', error);
            }
        }, 800);
    }, transitionDuration);
});
