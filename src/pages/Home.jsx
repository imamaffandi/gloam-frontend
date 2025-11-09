import React, { useRef, useEffect } from 'react'
import gsap from 'gsap';
import { Hero, SplitText, ImageCarousel } from '../components';
import { Glare } from '../components'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useGSAP } from '@gsap/react';
// Import carousel images
import { foto1, foto2, foto3, video1, video2, video3, a, b, c, d, e, f, g, h, i } from '../assets';
import { Link } from 'react-router-dom';
gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

// Carousel images array

const Home = () => {
    const videoRefs = useRef([]);
    const mainRef = useRef()
    const carouselImages = [foto1, foto2, foto3];
    const images = [a, b, c, d, e, f, g, h, i]
    const videos = [video1, video2, video3];
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.defaults({ ease: "power1.in", duration: 2 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: mainRef.current,
                    start: "top",
                    end: "bottom",
                    toggleActions: "restart none none reverse",
                    scrub: 2,
                    pin: true,
                },
            });

            tl.fromTo(
                mainRef.current.children,
                { x: -1000 },
                { x: 0, stagger: 5 },
                "+=4"
            );
        }, mainRef);

        return () => ctx.revert();
    }, []);
    return (
        <main className="mx-auto font-body h-full">
            {/* Hero */}
            <section className='relative w-full h-screen flex flex-col gap-5 items-center justify-center text-center overflow-hidden'>
                {/* Background Carousel */}
                <div className="absolute inset-0 z-0">
                    <ImageCarousel images={carouselImages} interval={5000} />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 w-full px-5 md:px-40 flex flex-col gap-5 items-center justify-center">
                    <Hero text="GLOAMING MISTAKE"
                        flex={true}
                        alpha={false}
                        stroke={false}
                        width={true}
                        weight={true}
                        italic={true}
                        textColor="#fff"
                        strokeColor="#ff0000"
                        className=''
                        minFontSize={100} />
                    {/* <h1 className='text-xs text-gray-400'>gloamingmistake</h1> */}
                    <SplitText
                        Tag='h2'
                        text='Embrace the Imperfect Hour'
                        type='words'
                        stagger={0.04}
                        fromY={20}
                        duration={0.8}
                        delay={1}
                        ease='power3.out'
                        className='text-lg lg:text-xl font-thin tracking-widest text-white'
                    />
                </div>
            </section>
            {/* About */}
            <section className="relative w-full">
                <section ref={mainRef} className="w-full h-screen relative">
                    {/* Brand Intro */}
                    <div className="w-72 absolute right-5 top-20">
                        <p className="font-bold text-5xl">Gloam</p>
                        <p className="text-justify text-xs/3.5">
                            Gloam blends minimalism and edge—creating timeless pieces that move
                            with you through every season. From casual staples to refined
                            statements, we design with intention and craft with purpose.
                        </p>
                    </div>

                    {/* New Arrivals */}
                    <main className="absolute top-10 left-0 w-full h-full">
                        <div className="relative bg-gray-200 h-[80%] w-[70%] rounded-br-3xl">
                            <p className="font-bold text-7xl/16 p-3">New Arrivals</p>
                            <div className="absolute bottom-5 left-5 flex justify-around items-baseline">
                                <div className="flex flex-col items-start justify-start border-dashed border-r px-10 border-stone-500">
                                    <p>Urban Overshirt</p>
                                    <p>Minimal Hoodie</p>
                                    <p>Relaxed Denim</p>
                                </div>
                                <div className="flex flex-col items-start justify-start border-dashed px-10 border-stone-500">
                                    <p>Everyday Cargo</p>
                                    <p>Essential Tee</p>
                                </div>
                            </div>
                        </div>
                    </main>

                    {/* Men Collection */}
                    <main className="absolute top-10 left-0 w-full h-full">
                        <div className="relative bg-gray-300 h-[80%] w-[70%] rounded-br-3xl">
                            <p className="font-bold text-7xl/16 p-3">Men’s Collection</p>
                            <div className="absolute bottom-5 left-5 flex justify-around items-baseline">
                                <div className="flex flex-col items-start justify-start border-dashed border-r px-10 border-stone-500">
                                    <p>Streetwear Series</p>
                                    <p>Classic Outerwear</p>
                                    <p>Monochrome Line</p>
                                </div>
                                <div className="flex flex-col items-start justify-start border-dashed px-10 border-stone-500">
                                    <p>Minimal Knitwear</p>
                                    <p>Everyday Essentials</p>
                                </div>
                            </div>
                        </div>
                    </main>

                    {/* Women Collection */}
                    <main className="absolute top-10 left-0 w-full h-full">
                        <div className="relative bg-gray-400 h-[80%] w-[70%] rounded-br-3xl">
                            <p className="font-bold text-7xl/16 p-3">Women’s Collection</p>
                            <div className="absolute bottom-5 left-5 flex justify-around items-baseline">
                                <div className="flex flex-col items-start justify-start border-dashed border-r px-10 border-stone-500">
                                    <p>Fluid Dress</p>
                                    <p>Minimal Blazer</p>
                                    <p>Soft Knit Set</p>
                                </div>
                                <div className="flex flex-col items-start justify-start border-dashed px-10 border-stone-500">
                                    <p>Everyday Top</p>
                                    <p>Wide Pants</p>
                                    <p>Gloam Studio Series</p>
                                </div>
                            </div>
                        </div>
                    </main>

                    {/* Accessories */}
                    <main className="absolute top-10 left-0 w-full h-full">
                        <div className="relative bg-gray-500 text-white h-[80%] w-[70%] rounded-br-3xl">
                            <p className="font-bold text-7xl/16 p-3">Accessories</p>
                            <div className="absolute bottom-5 left-5 flex justify-around items-baseline">
                                <div className="flex flex-col items-start justify-start border-dashed border-r px-10 border-white">
                                    <p>Signature Tote</p>
                                    <p>Minimal Cap</p>
                                    <p>Canvas Belt</p>
                                </div>
                                <div className="flex flex-col items-start justify-start border-dashed px-10 border-white">
                                    <p>Gloam Socks</p>
                                    <p>Metal Keychain</p>
                                </div>
                            </div>
                        </div>
                    </main>
                </section>
            </section>

            {/* Portfolio */}
            <section id='portfolio' className='w-full px-8 lg:px-20 min-h-screen flex flex-col gap-5 items-center justify-center'>
                <p>Our latest products</p>
                <div className='flex flex-wrap items-center justify-center w-full py-10'>
                    {images.map((url, idx) => (
                        <Link to={'/catalog'} key={idx}>
                            <img
                                src={url}
                                alt={`placeholder-${idx}`}
                                className='border border-dark overflow-hidden w-40 lg:w-72 h-20 lg:h-56 m-2 rounded-xl object-cover grayscale hover:grayscale-0 cursor-pointer hover:scale-105 transition-all duration-300 active:scale-95'
                            />
                        </Link>
                    ))}
                </div>
            </section>
            {/* Video section */}
            <section className='w-full px-5 lg:px-20 py-10 h-fit lg:h-screen flex flex-col lg:flex-row gap-10 items-center justify-center'>
                {Array.isArray(videos) && videos.length > 0 ? (
                    videos.map((url, idx) => (
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload='metadata'
                            key={idx}
                            className='h-[90%] w-96 object-cover'
                            style={{ background: '#222' }}
                            ref={(el) => (videoRefs.current[idx] = el)}
                        >
                            <source src={url} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ))
                ) : (
                    <div className="text-white text-center w-full">
                        No videos to display.
                    </div>
                )}
            </section>
            {/* CTA */}
            <div className="h-screen w-full relative font-body">
                <main className="absolute w-[80%] h-[80%] bg-stone-900 text-white shadow-xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Glare glareColor="#ffffff"
                        glareOpacity={0.3}
                        background='transparent'
                        glareAngle={-30}
                        glareSize={300}
                        transitionDuration={800}
                        playOnce={false}>
                        <section className="relative w-full h-full">
                            <p className="absolute left-20 text-center top-10 text-5xl tracking-widest">
                                Get In touch
                            </p>
                            <div className="absolute w-full px-20 text-xs top-40 flex items-start justify-between">
                                <p className="w-1/3">
                                    Contact us today and let’s create something extraordinary
                                    together! We’re excited to collaborate with you
                                </p>
                                <button className="footer-btn mr-40">Whatsapp</button>
                            </div>
                            <div className="border-t-2 absolute bottom-10 flex items-start pt-10 justify-around w-full">
                                <a
                                    href="https://instagram.com/gloamingmistake"
                                    target="_blank"
                                    className="w-64 tracking-wider text-xs/5"
                                >
                                    @gloamingmistake
                                </a>
                                <p className="w-64 tracking-wider text-xs/5">+62 812-3217-9590</p>
                                <p className="w-64 tracking-wider text-xs/5">
                                    gloamingmistake@gmail.com
                                </p>
                            </div>
                        </section>
                    </Glare>
                </main>
            </div>
        </main>
    )
}

export default Home