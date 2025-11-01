import React, { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SmoothScroll = () => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            smoothWheel: true,
            smoothTouch: false,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        })

        const onScroll = () => ScrollTrigger.update()
        lenis.on('scroll', onScroll)

        let rafId = 0
        const raf = (time) => {
            lenis.raf(time)
            rafId = requestAnimationFrame(raf)
        }
        rafId = requestAnimationFrame(raf)

        return () => {
            cancelAnimationFrame(rafId)
            lenis.off('scroll', onScroll)
            lenis.destroy()
        }
    }, [])

    return null
}

export default SmoothScroll


