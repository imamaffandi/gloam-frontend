import React, { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SplitText = ({
    as: Tag = 'p',
    text = '',
    type = 'chars', // 'chars' | 'words'
    stagger = 0.04,
    fromY = 20,
    duration = 0.8,
    delay = 0,
    ease = 'power3.out',
    className = '',
    // ScrollTrigger props
    useScrollTrigger = false,
    scrollTriggerStart = 'top 80%',
    scrollTriggerEnd = 'bottom 20%',
    scrollTriggerScrub = false,
    scrollTriggerToggleActions = 'play none none none',
    scrollTriggerMarkers = false,
}) => {
    const containerRef = useRef(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const targets = containerRef.current?.querySelectorAll('.split-unit') || []
            gsap.set(targets, { y: fromY, opacity: 0 })

            if (useScrollTrigger) {
                gsap.to(targets, {
                    y: 0,
                    opacity: 1,
                    duration,
                    ease,
                    stagger,
                    delay,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: scrollTriggerStart,
                        end: scrollTriggerEnd,
                        scrub: scrollTriggerScrub,
                        toggleActions: scrollTriggerToggleActions,
                        markers: scrollTriggerMarkers,
                    }
                })
            } else {
                gsap.to(targets, {
                    y: 0,
                    opacity: 1,
                    duration,
                    ease,
                    stagger,
                    delay,
                })
            }
        }, containerRef)

        return () => ctx.revert()
    }, [stagger, fromY, duration, delay, ease, text, type, useScrollTrigger, scrollTriggerStart, scrollTriggerEnd, scrollTriggerScrub, scrollTriggerToggleActions, scrollTriggerMarkers])

    const renderUnits = () => {
        if (type === 'words') {
            const words = text.split(' ')
            return words.map((word, index) => (
                <React.Fragment key={index}>
                    <span className="split-unit inline-block will-change-transform">{word}</span>
                    {index < words.length - 1 ? ' ' : null}
                </React.Fragment>
            ))
        }

        return Array.from(text).map((ch, index) => (
            <span key={index} className="split-unit inline-block will-change-transform">
                {ch === ' ' ? '\u00A0' : ch}
            </span>
        ))
    }

    return (
        <Tag ref={containerRef} className={className}>
            {renderUnits()}
        </Tag>
    )
}

export default SplitText


