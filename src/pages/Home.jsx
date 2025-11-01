import React, { useRef } from 'react'
import gsap from 'gsap';
import { Hero, SplitText, ImageCarousel } from '../components';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useGSAP } from '@gsap/react';
// Import carousel images
import img1 from '../assets/IMG_4723.JPG';
import img2 from '../assets/IMG_4771.JPG';
import img3 from '../assets/DSC03534.webp';
import img4 from '../assets/DSC03831.webp';
import img5 from '../assets/DSC05946.webp';
gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

// Carousel images array
const carouselImages = [img1, img2, img3, img4, img5];

const Home = () => {
    const videoRefs = useRef([]);
    const images = Array.from({ length: 5 }, (_, i) =>
        `https://picsum.photos/300/200?random=${i}`
    );
    const videos = [
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
    ];

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
                        className='text-5xl'
                        minFontSize={150} />
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
            {/* Portfolio */}
            <section id='portfolio' className='w-full px-8 lg:px-20 min-h-screen flex flex-col gap-5 items-center justify-center'>
                <p>Our latest products</p>
                <div className='flex flex-wrap items-center justify-center w-full py-10'>
                    {images.map((url, idx) => (
                        <a href="#" key={idx}>
                            <img
                                src={url}
                                alt={`placeholder-${idx}`}
                                className='w-40 lg:w-72 h-20 lg:h-56 m-2 rounded-xl object-cover grayscale hover:grayscale-0 cursor-pointer hover:scale-105 transition-all duration-300 active:scale-95'
                            />
                        </a>
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
            <section className='cta w-full pb-20 lg:pb-5 bg-dark text-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 p-5'>
                <img src="/logo.png" alt="logo gloam" className="object-contain size-12 lg:size-32" />
                <div className='flex flex-col items-start lg:items-center gap-2'>
                    <p className='text-xs'>Nomor Whatsapp GLOAM</p>
                    <p className='text-xl font-bold tracking-widest'>+62 812-3217-9590</p>
                    <p className='text-xs'>Copyright gloamingmistake 2025</p>
                </div>
                <div className='w-full lg:w-1/3'>
                    <p className='text-xs'>Email</p>
                    <p className='text-xl font-bold tracking-widest'>gloamingmistake@gmail.com</p>
                    <p className='text-xs pt-3'>Instagram</p>
                    <p className='text-xl font-bold tracking-widest'>@gloamingmistake</p>
                </div>
            </section>
        </main>
    )
}

export default Home