import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useLocation, Outlet } from "react-router-dom";
import "./Transition.css"

const Transition = () => {
    const location = useLocation();
    const containerRef = useRef(null);

    useEffect(() => {
        const ease = "power4.inOut";

        // Function to reveal the transition
        const revealTransition = () => {
            return new Promise((resolve) => {
                gsap.set(".block", { scaleY: 1 });
                gsap.to(".block", {
                    scaleY: 0,
                    duration: 1,
                    stagger: {
                        each: 0.1,
                        from: "start",
                        grid: [2, 5], // Fixed grid property
                        axis: "x",
                    },
                    ease: ease,
                    onComplete: resolve,
                });
            });
        };

        // Function to animate the transition
        const animateTransition = () => {
            return new Promise((resolve) => {
                gsap.set(".block", { visibility: "visible", scaleY: 0 });
                gsap.to(".block", {
                    scaleY: 1,
                    duration: 1,
                    stagger: {
                        each: 0.1,
                        from: "start",
                        grid: [2, 5],
                        axis: "x",
                    },
                    ease: ease,
                    onComplete: resolve,
                });
            });
        };

        const links = document.querySelectorAll("a");
        const handleLinkClick = (event) => {
            event.preventDefault();
            const href = event.currentTarget.getAttribute("href");

            if (href && !href.startsWith("#") && href !== window.location.pathname) {
                animateTransition().then(() => {
                    window.location.href = href;
                });
            }
        };

        links.forEach((link) => {
            link.addEventListener("click", handleLinkClick);
        });

        revealTransition().then(() => {
            gsap.set(".block", { visibility: "hidden" });
        });

        return () => {
            links.forEach((link) => {
                link.removeEventListener("click", handleLinkClick);
            });
        };
    }, [location]);

    return (
        <div ref={containerRef} className="page-container">
            <div className="transition">
                <div className="transition-row row-1">
                    <div className="block"></div>
                    <div className="block"></div>
                    <div className="block"></div>
                    <div className="block"></div>
                </div>
            </div>
            <Outlet />
        </div>
    );
};

export default Transition;
