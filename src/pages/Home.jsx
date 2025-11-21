import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap';
import { Hero, SplitText, ImageCarousel } from '../components';
import { Glare } from '../components'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useGSAP } from '@gsap/react';
// Import carousel images
import { img1, img2, img3, video1, video2, video3, b, c, d, e, f, g, i } from '../assets';
import { Link } from 'react-router-dom';
import { blogAPI } from '../services/api';
gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

// Carousel images array

const Home = () => {
    const videoRefs = useRef([]);
    const mainRef = useRef()
    const carouselImages = [img1, img2, img3];
    const images = [b, c, d, e, f, g, i]
    const videos = [video1, video2, video3];
    const [blogs, setBlogs] = useState([]);
    const [loadingBlogs, setLoadingBlogs] = useState(true);
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

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoadingBlogs(true);
                const data = await blogAPI.getAll();
                setBlogs(data);
            } catch (err) {
                console.error('Error fetching blogs:', err);
                // Don't show error, just use empty array
                setBlogs([]);
            } finally {
                setLoadingBlogs(false);
            }
        };

        fetchBlogs();
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
                    <SplitText
                        Tag='h2'
                        text='Overpower The World'
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
                            Gloaming Mistake overpower the world
                        </p>
                    </div>

                    {/* New Arrivals */}
                    <main className="absolute top-10 left-0 w-full h-full">
                        <div className="relative bg-gray-200 h-[80%] w-full md:w-[70%] rounded-br-3xl">
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
                        <div className="relative bg-gray-300 h-[80%] w-full md:w-[70%] rounded-br-3xl">
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
                        <div className="relative bg-gray-400 h-[80%] w-full md:w-[70%] rounded-br-3xl">
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
                        <div className="relative bg-gray-500 text-white h-[80%] w-full md:w-[70%] rounded-br-3xl">
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
            <section id='portfolio' className='w-full px lg:px-20 min-h-[70dvh] md:min-h-screen flex flex-col gap-5 items-center justify-center'>
                <p>Our latest products</p>
                <div className='flex flex-wrap items-center justify-center py-10'>
                    {images.map((url, idx) => (
                        <Link to={'/catalog'} key={idx}>
                            <img
                                src={url}
                                alt={`placeholder-${idx}`}
                                className='border border-dark overflow-hidden w-[90%] md:w-40 lg:w-72 h-20 lg:h-56 m-2 rounded-xl object-cover grayscale hover:grayscale-0 cursor-pointer hover:scale-105 transition-all duration-300 active:scale-95'
                            />
                        </Link>
                    ))}
                </div>
            </section>
            {/* Blog */}
            <section id='blog' className='w-full px-8 lg:px-20 min-h-[70dvh] md:min-h-screen flex flex-col gap-5 items-center justify-center'>
                <p>Our journals</p>
                <div className='flex flex-wrap items-center justify-around w-full py-10'>
                    {loadingBlogs ? (
                        <div className="flex justify-center items-center w-full py-10">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#000000" className="size-6 animate-spin">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>
                        </div>
                    ) : blogs.length > 0 ? (
                        blogs.map((blog) => {
                            const previewText = blog.content ? blog.content.substring(0, 100) + '...' : '';
                            return (
                                <Link
                                    to={`/blog/${blog._id}`}
                                    key={blog._id}
                                    className='overflow-hidden max-w-96 h-56 m-2 hover:shadow cursor-pointer transition-all duration-300 flex items-start justify-around gap-2'
                                >
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className='object-cover w-full h-full'
                                    />
                                    <div className='flex flex-col items-start justify-start'>
                                        <p className='font-body text-sm font-semibold tracking-wider mt-2'>
                                            {blog.title ? (blog.title.length > 50 ? blog.title.substring(0, 50) + '...' : blog.title) : 'Untitled'}
                                        </p>
                                        <p className='font-body text-xs tracking-wider mt-1'>
                                            {previewText}
                                        </p>
                                    </div>
                                </Link>
                            );
                        })
                    ) : null}
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
            <div className="min-h-screen w-full relative font-body py-10 md:py-0 flex items-center justify-center">
                <main className="bg-dark text-light">
                    <Glare glareColor="#ffffff"
                        glareOpacity={0.3}
                        background='transparent'
                        glareAngle={-30}
                        glareSize={300}
                        transitionDuration={800}
                        playOnce={false}>
                        <section className="relative w-full h-full flex flex-col justify-between p-6 md:p-10 lg:p-20">
                            <div className="border-b border-light/50 pb-5 flex flex-col gap-6 md:gap-10">
                                <p className="text-2xl md:text-3xl lg:text-5xl tracking-widest text-center md:text-left">
                                    Get In touch
                                </p>
                                <div className="flex flex-col md:flex-row items-start justify-between gap-4 md:gap-0">
                                    <p className="text-xs md:text-sm w-full md:w-1/3 lg:w-1/3">
                                        Contact us today and let's create something extraordinary
                                        together! We're excited to collaborate with you
                                    </p>
                                    <a
                                        href='https://wa.me/6287851682131'
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="footer-btn w-full md:w-auto md:mr-0 lg:mr-40 text-center"
                                    >
                                        Whatsapp
                                    </a>
                                </div>
                            </div>
                            <div className=" pt-6 md:pt-10 flex flex-col md:flex-row items-start md:items-center justify-around gap-4 md:gap-0 w-full">
                                <a
                                    href="https://instagram.com/gloamingmistake"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full md:w-64 tracking-wider text-xs md:text-xs/5 text-center md:text-left"
                                >
                                    @gloamingmistake
                                </a>
                                <p className="w-full md:w-64 tracking-wider text-xs md:text-xs/5 text-center md:text-left">+62 878-5168-2131</p>
                                <p className="w-full md:w-64 tracking-wider text-xs md:text-xs/5 text-center md:text-left break-words">
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