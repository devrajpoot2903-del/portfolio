document.addEventListener("DOMContentLoaded", () => {
    // Removed third-party smooth scrolling (Lenis) to eliminate lag/glitchiness.
    // Relying on native CSS smooth scrolling for a perfect, native experience.
    
    // Smooth scroll for anchor links using native behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
