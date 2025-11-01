import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

const Transition = ({ children }) => {
    const location = useLocation();
    const pageRef = useRef(null);
    const overlayRef = useRef(null);

    useEffect(() => {
        const page = pageRef.current;
        const overlay = overlayRef.current;

        if (!page || !overlay) return;

        // Create timeline for page transition
        const tl = gsap.timeline();

        // Set initial states
        gsap.set(page, { opacity: 0, y: 30, scale: 0.95, visibility: 'hidden' });
        gsap.set(overlay, { scaleX: 0, transformOrigin: 'left center' });

        // Page transition animation sequence
        tl.to(overlay, {
            scaleX: 1,
            duration: 0.8,
            ease: 'power3.inOut'
        })
            .set(page, { visibility: 'visible' }) // Make content visible only after overlay covers screen
            .to(page, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: 'power3.out'
            }, '-=0.4')
            .to(overlay, {
                scaleX: 0,
                duration: 0.8,
                ease: 'power3.inOut',
                transformOrigin: 'right center'
            }, '-=0.6');

        return () => {
            tl.kill();
        };
    }, [location.pathname]);

    return (
        <>
            {/* Transition overlay with gradient */}
            <div
                ref={overlayRef}
                className="fixed inset-0 z-[9999] pointer-events-none"
                style={{
                    willChange: 'transform',
                    background: '#222222'
                }}
            />

            {/* Page content */}
            <div
                ref={pageRef}
                className="transition-page"
                style={{ willChange: 'opacity, transform' }}
            >
                {children}
            </div>
        </>
    );
};

export default Transition;