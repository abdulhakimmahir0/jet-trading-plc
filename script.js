/* =====================================================
   JET TRADING PLC
   MAIN JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       HEADER SCROLL EFFECT
    ================================================= */

    const header = document.querySelector(".header");

    function updateHeader() {
        if (!header) return;

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });


    /* =================================================
       MOBILE MENU
    ================================================= */

    const menuBtn = document.getElementById("menuBtn");
    const nav = document.getElementById("nav");

    if (menuBtn && nav) {

        menuBtn.addEventListener("click", () => {
            nav.classList.toggle("active");

            const isOpen =
                nav.classList.contains("active");

            menuBtn.setAttribute(
                "aria-expanded",
                isOpen
            );

            menuBtn.innerHTML =
                isOpen ? "✕" : "☰";
        });


        /* Close menu when a link is clicked */

        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("active");

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuBtn.innerHTML = "☰";

            });

        });

    }


    /* =================================================
       SCROLL REVEAL
    ================================================= */

    const revealElements =
        document.querySelectorAll(
            ".section-heading, " +
            ".product-card, " +
            ".feature, " +
            ".feedback-card, " +
            ".finder-card, " +
            ".about-content, " +
            ".delivery-content, " +
            ".contact-item"
        );


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                (entries, obs) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            obs.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(element => {

            element.classList.add("reveal");

            observer.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }


    /* =================================================
       BACK TO TOP BUTTON
    ================================================= */

    let backToTop =
        document.querySelector(".back-to-top");


    if (!backToTop) {

        backToTop =
            document.createElement("button");

        backToTop.className =
            "back-to-top";

        backToTop.type = "button";

        backToTop.setAttribute(
            "aria-label",
            "Back to top"
        );

        backToTop.innerHTML = "↑";

        document.body.appendChild(
            backToTop
        );

    }


    function updateBackToTop() {

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }


    updateBackToTop();


    window.addEventListener(
        "scroll",
        updateBackToTop,
        { passive: true }
    );


    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    /* =================================================
       HERO TIRE
       
       IMPORTANT:
       Do NOT replace the CSS transform.
       The old code was doing:
       
       heroTire.style.transform =
       translateY(...)
       
       which removed:
       
       translate(-50%, -50%)
       
       on mobile / responsive layouts.
       
       We use CSS variables instead.
    ================================================= */

    const heroTire =
        document.querySelector(".main-tire");


    if (heroTire) {

        const desktopQuery =
            window.matchMedia("(min-width: 851px)");

        function updateHeroTire() {

            /* Disable scroll movement on tablet/mobile */

            if (!desktopQuery.matches) {

                heroTire.style.removeProperty(
                    "--tire-scroll"
                );

                return;

            }


            const scroll =
                Math.min(
                    window.scrollY,
                    window.innerHeight
                );


            const movement =
                Math.min(
                    scroll * 0.08,
                    35
                );


            heroTire.style.setProperty(
                "--tire-scroll",
                `${movement}px`
            );

        }


        updateHeroTire();


        window.addEventListener(
            "scroll",
            updateHeroTire,
            { passive: true }
        );


        window.addEventListener(
            "resize",
            updateHeroTire
        );

    }


    /* =================================================
       SMOOTH INTERNAL LINKS
    ================================================= */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect()
                        .top +
                    window.scrollY -
                    headerHeight;


                window.scrollTo({

                    top:
                        Math.max(
                            0,
                            targetPosition
                        ),

                    behavior: "smooth"

                });

            }
        );

    });


});