import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap';
import { useLoading } from '../context/LoadingContext';

const Loading = () => {
    const containerRef = useRef(null);
    const logoRef = useRef(null);
    const { isLoading } = useLoading();
    const [shouldRender, setShouldRender] = useState(true);

    useEffect(() => {
        if (!isLoading && containerRef.current && logoRef.current) {
            // Create exit animation timeline
            const tl = gsap.timeline({
                onComplete: () => {
                    // Remove from DOM after animation completes
                    setShouldRender(false);
                }
            });

            // Animate logo out (scale down and fade)
            tl.to(logoRef.current, {
                scale: 0.8,
                opacity: 0,
                duration: 0.5,
                ease: "power2.in"
            });

            // Animate background out (fade)
            tl.to(containerRef.current, {
                opacity: 0,
                duration: 0.6,
                ease: "power2.inOut"
            }, "-=0.3");
        }
    }, [isLoading]);

    // Reset when loading starts again
    useEffect(() => {
        if (isLoading && containerRef.current && logoRef.current) {
            setShouldRender(true);
            // Reset styles
            gsap.set(containerRef.current, { opacity: 1 });
            gsap.set(logoRef.current, { scale: 1, opacity: 1 });
        }
    }, [isLoading]);

    if (!shouldRender) return null;

    return (
        <div
            ref={containerRef}
            className='fixed inset-0 z-9999 bg-paper text-ink flex flex-col w-full h-screen'
        >
            <div className="flex justify-between border-b border-ink micro px-4 py-2">
                <span>[ Reignite District ]</span>
                <span>Boot Sequence / RD-01</span>
            </div>
            <div className="flex-1 flex items-center justify-center overflow-hidden">
                {/* Logo asset is white; invert to carbon ink on paper */}
                <img
                    ref={logoRef}
                    src="/logo.png"
                    alt="Loading"
                    className='object-contain max-w-xs md:max-w-md invert'
                />
            </div>
            <div className="border-t border-ink">
                <div className="flex justify-between micro px-4 py-2">
                    <span className="flex items-center gap-2">
                        <span className="inline-block w-2 h-2 bg-hazard animate-pulse" />
                        Loading Assets
                    </span>
                    <span>/// Stand By</span>
                </div>
                <div className="hazard-stripe h-3 border-t border-ink" aria-hidden="true" />
            </div>
        </div>
    )
}

export default Loading