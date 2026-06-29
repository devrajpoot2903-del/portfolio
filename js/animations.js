document.addEventListener("DOMContentLoaded", () => {
    // Ensure GSAP and ScrollTrigger are loaded
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Create a context to manage all animations and prevent memory leaks
    let ctx = gsap.context(() => {
        
        // 1. Navbar: Fade from top. Duration 0.6s. Very subtle.
        gsap.from("header", {
            y: -15,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out"
        });

        // 2. Hero Section - Premium Motion (Phase 4.2)
        const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
        
        // Prepare heading for stagger (splitting Dev Rajpoot into words)
        const heroHeading = document.querySelector("#hero h1");
        if (heroHeading && heroHeading.textContent.trim() === "Dev Rajpoot") {
            heroHeading.innerHTML = '<span class="inline-block">Dev</span> <span class="inline-block">Rajpoot</span>';
        }
        
        heroTl.from("#hero h1 span", { // Heading stagger
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.1
        }, 0.2) // Delay after navbar
        .from("#hero h2, #hero p, #hero .inline-flex", { // Subtitle, desc, badge fade
            opacity: 0,
            y: 20,
            duration: 0.6
        }, "-=0.4")
        .from("#hero .flex-col.sm\\:flex-row > *", { // CTA Buttons - Fade + translateY, NO scale
            opacity: 0,
            y: 15,
            duration: 0.6,
            stagger: 0.1
        }, "-=0.4");

        // Availability Badge gentle floating animation
        gsap.to("#hero .inline-flex", {
            y: -6,
            duration: 1.2,
            yoyo: true,
            repeat: -1,
            ease: "power1.inOut",
            delay: 1.2 // Wait for entrance timeline to finish
        });

        // Scroll Indicator gentle animation
        gsap.to("#hero .absolute.bottom-10 svg", {
            y: 10,
            opacity: 0.3,
            duration: 1.5,
            yoyo: true,
            repeat: -1,
            ease: "power1.inOut"
        });

        // Mouse Parallax for background decorative element
        const heroSection = document.querySelector("#hero");
        const bgGlow = document.querySelector("#hero-bg-glow");
        
        if (heroSection && bgGlow) {
            heroSection.addEventListener("mousemove", (e) => {
                // Max movement 5-10px as requested
                const xPos = (e.clientX / window.innerWidth - 0.5) * 20; 
                const yPos = (e.clientY / window.innerHeight - 0.5) * 20;
                
                gsap.to(bgGlow, {
                    x: xPos,
                    y: yPos,
                    duration: 1,
                    ease: "power2.out"
                });
            });
        }

        // 3. Global Section Reveals (About, Contact)
        const sections = gsap.utils.toArray("section#about, section#contact");
        sections.forEach(section => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    once: true
                },
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: "expo.out"
            });
        });

        // Arsenal / Skills section animations removed as requested to maintain normal layout.

        // 4. Premium Project Showcase Motion (Phase 4.3)
        const projectSection = document.querySelector("#projects");
        if (projectSection) {
            // Animate section title
            gsap.from("#projects .flex-col.md\\:flex-row", { // Header
                scrollTrigger: { trigger: "#projects", start: "top 80%", once: true },
                opacity: 0, 
                y: 30, 
                duration: 0.6, 
                ease: "power3.out"
            });

            // Animate each card and its internals with a delay-based stagger
            const projectCards = gsap.utils.toArray("#projects .group");
            projectCards.forEach((card, index) => {
                let tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: "#projects .grid",
                        start: "top 80%",
                        once: true
                    },
                    delay: index * 0.12 // 0.12s stagger per card
                });

                // Card container entrance
                tl.from(card, { opacity: 0, y: 30, duration: 0.7, ease: "power3.out" }, 0);
                
                // Project Image reveal (fade + slight translate)
                const imgContainer = card.querySelector(".relative.border-b");
                if (imgContainer) {
                    tl.from(imgContainer, { opacity: 0, y: 15, duration: 0.7, ease: "power3.out" }, 0.2);
                }

                // Project Details entrance (only entrance, not continuous)
                const details = card.querySelectorAll("h3, p");
                if (details.length > 0) {
                    tl.from(details, { opacity: 0, y: 10, duration: 0.6, stagger: 0.1, ease: "power3.out" }, 0.35);
                }

                // Tech Stack Badges stagger
                const badges = card.querySelectorAll(".flex-wrap span");
                if (badges.length > 0) {
                    tl.from(badges, { opacity: 0, y: 10, duration: 0.5, stagger: 0.08, ease: "power3.out" }, 0.45);
                }

                // Live & GitHub Buttons
                const links = card.querySelectorAll(".flex.items-center.gap-6 a");
                if (links.length > 0) {
                    tl.from(links, { opacity: 0, y: 10, duration: 0.5, stagger: 0.08, ease: "power3.out" }, 0.55);
                }
            });
        }

        // 5. Timeline & Education Cards Reveal (Sequential)
        const eduSection = document.querySelector("#education");
        if (eduSection) {
            gsap.from("#education .pr-0.md\\:pr-12", { // Timeline column
                scrollTrigger: { trigger: "#education", start: "top 80%", once: true },
                opacity: 0, y: 40, duration: 0.8, ease: "expo.out"
            });
            const certCards = gsap.utils.toArray("#education .grid.grid-cols-1.sm\\:grid-cols-2 > div");
            gsap.from(certCards, { // Cards sequential
                scrollTrigger: { trigger: "#education .grid.grid-cols-1.sm\\:grid-cols-2", start: "top 80%", once: true },
                opacity: 0, y: 40, duration: 0.8, stagger: 0.15, ease: "expo.out"
            });
        }

        // 6. Footer: Simple fade
        gsap.from("footer", {
            scrollTrigger: {
                trigger: "footer",
                start: "top 90%",
                once: true
            },
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });

        // 7. Premium Magnetic Buttons (Phase 4.4)
        // Applied ONLY to primary CTA buttons as requested
        const magneticButtons = document.querySelectorAll("#hero .flex-col.sm\\:flex-row a, #projects .flex.items-center.gap-6 a");
        
        magneticButtons.forEach(btn => {
            btn.addEventListener("mousemove", (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                // Maximum movement: 8px
                const maxMovement = 8;
                const moveX = (x / (rect.width / 2)) * maxMovement;
                const moveY = (y / (rect.height / 2)) * maxMovement;
                
                gsap.to(btn, {
                    x: moveX,
                    y: moveY,
                    duration: 0.4,
                    ease: "power2.out"
                });
            });
            
            btn.addEventListener("mouseleave", () => {
                // Smoothly return without bouncing
                gsap.to(btn, {
                    x: 0,
                    y: 0,
                    duration: 0.6,
                    ease: "power3.out"
                });
            });
        });

    }); // End context
});
