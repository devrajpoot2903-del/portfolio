document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");
    const navLinks = document.querySelectorAll("nav a[href^='#']");
    const sections = document.querySelectorAll("section");

    // Scroll Blur Effect (Phase 4.4)
    // Ensures header stays transparent/solid based on scroll
    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 20) {
                header.classList.add("bg-navBg/80", "backdrop-blur-md");
                header.classList.remove("bg-navBg");
            } else {
                header.classList.add("bg-navBg");
                header.classList.remove("bg-navBg/80", "backdrop-blur-md");
            }
        }, { passive: true });
    }

    // ScrollSpy Active Link Highlighting (Phase 4.4)
    // Seamlessly tracks which section is currently active
    const observerOptions = {
        root: null,
        rootMargin: "-30% 0px -70% 0px",
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                navLinks.forEach(link => {
                    link.classList.remove("nav-active");
                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.add("nav-active");
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
});
