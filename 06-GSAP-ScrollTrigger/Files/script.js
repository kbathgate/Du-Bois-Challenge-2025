document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    // Title fades in
    gsap.to(".title", { opacity: 1, duration: 1 });

    //Yellow box fade in
    gsap.to(".box1", {
        opacity: 1, 
        scale: 0.3,
        bottom: "10px", 
        left: "15%", 
        duration: 1.5, 
        delay: 1, 
        ease: "power2.out", 
        scrollTrigger: {
            trigger: ".box1",
            start: "top 40%", 
            end: "top 10%", 
            scrub: true, 
            onEnter: () => {
                gsap.set(".box1", { 
                    position: "fixed", 
                    transform: "none", 
                    bottom: "10px", 
                    left: "5%" 
                });

                // Fade in the text next to the box
                gsap.to(".box-text", {
                    opacity: 1, 
                    duration: 1, 
                    delay: 1, 
                    scrollTrigger: {
                        trigger: ".box-text",
                        start: "top 40%",
                        end: "top 40%",
                        toggleActions: "play reverse play reverse",
                        scrub: true,
                        onComplete: () => {
                            animateHorizontalBrace();
                        }
                    }
                });        
            }
        }   
    });

    // Blue box then fade in 
    gsap.to(".box2", {
        opacity: 1, 
        scale: 0.3, 
        bottom: "10px", 
        left: "70%", 
        ease: "power2.out", 
        scrollTrigger: {
            trigger: ".box2", 
            start: "top 40%", 
            end: "top 10%", 
            scrub: true, 
            onEnter: () => {
                gsap.set(".box2", { 
                    position: "fixed", 
                    transform: "none", 
                    bottom: "10px", 
                });

                 // Fade in the text next to the box
                 gsap.to(".box-text2", {
                    opacity: 1, 
                    duration: 1, 
                    delay: 1.5, 
                    scrollTrigger: {
                        trigger: ".box-text",
                        start: "top 40%",
                        end: "top 40%",
                        toggleActions: "play reverse play reverse",
                        scrub: true
                    }
                });  
            }
        }
    });

    // Horizontal bracket animation (coming from the right)       
    gsap.to(".horizontal-brace", {
        opacity: 1, 
        duration: 1.5,
        ease: "power2.out", 
        scrollTrigger: {
            trigger: ".box-text2", 
            start: "top 80%", 
            end: "top 20%", 
            scrub: true
        }
    });
    
    gsap.to(".horizontal-brace", {
        opacity: 1,
        duration: 1.5,
        scrollTrigger: {
            trigger: ".horizontal-brace",
            start: "top 20%",
            end: "top 10%",
            scrub: true,
            onEnter: () => {
                gsap.set(".horizontal-brace", {
                    position: "fixed",
                    top: "50px",
                    left: "15%",
                    width: "75vw",
                    transform: "translateX(-5%)"
                });
            },
            onLeaveBack: () => {
                gsap.set(".horizontal-brace", {
                    opacity: 0
                });
            }
        }
    });

    // Move the PROPERTY text with the brace
    gsap.to(".property-label", {
        opacity: 1,
        x: 75,  // Moves right slightly
        y: 85,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".horizontal-brace",
            start: "top 70%",
            end: "top 50%",
            scrub: true
        }
    });

    gsap.to(".year-label", {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".horizontal-brace",
            start: "top 50%",
            end: "top 30%",
            scrub: true
        }
    });

    gsap.to(".vertical-brace", {
        opacity: 1, 
        duration: 1.5,
        ease: "power2.out", 
        scrollTrigger: {
            trigger: ".box-text2", 
            start: "top 80%", 
            end: "top 20%", 
            scrub: true
        }
    });

    gsap.to(".vertictal-brace", {
        opacity: 1, 
        ease: "power2.out", 
        scrollTrigger: {
            trigger: ".box-text2", 
            start: "top 80%", 
            end: "top 20%", 
            scrub: true,
            onEnter: () => {
                gsap.set(".vertical-brace", {
                    position: "fixed",
                    top: "10%",
                    left: "5%",
                    height: "65vh",
                });
            },
            onLeaveBack: () => {
                gsap.to(".vertical-brace", { 
                    opacity: 0
                });
            },            
        }
    });

    gsap.to(".owners-label", {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".horizontal-brace",
            start: "top 60%",
            end: "top 40%",
            scrub: true
        }
    });

    gsap.to(".v-year", {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".horizontal-brace",
            start: "top 60%",
            end: "top 40%",
            scrub: true
        }
    });

    gsap.to(".vertical-bars-1880, .horizontal-bars-1880, .vertical-bars-1890, .horizontal-bars-1890, .vertical-bars-1899, .horizontal-bars-1899, .horizontal-top-1899", {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
            trigger: ".year-right",
            start: "top 80%",
            end: "top 50%",
            scrub: true
        }
    });

    gsap.to(".vertical-number-1880, .vertical-number-1890, .vertical-number-1899, .horizontal-number-1880, .horizontal-number-1890, .horizontal-number-1899", {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
            trigger: ".year-right",
            start: "top 80%",
            end: "top 50%",
            scrub: true
        }
    });
});