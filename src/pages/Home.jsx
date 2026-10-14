import React, { useRef, useEffect, useState, useMemo } from 'react'
import gsap from 'gsap';
import { SplitText, ImageCarousel, SectionHeader, SiteFooter } from '../components';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useGSAP } from '@gsap/react';
// Import carousel images
import { img1, img2, img3, video1, video2, video3 } from '../assets';
import { Link } from 'react-router-dom';
import { blogAPI, productAPI } from '../services/api';
import { useLoading } from '../context/LoadingContext';
gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

const collections = [
    {
        title: 'New Arrivals',
        ref: 'RD-NA-01',
        tone: 'bg-paper-2 text-ink',
        rule: 'border-ink',
        items: [
            ['Urban Overshirt', 'Minimal Hoodie', 'Relaxed Denim'],
            ['Everyday Cargo', 'Essential Tee'],
        ],
    },
    {
        title: 'Men’s Collection',
        ref: 'RD-MC-02',
        tone: 'bg-paper text-ink',
        rule: 'border-ink',
        items: [
            ['Streetwear Series', 'Classic Outerwear', 'Monochrome Line'],
            ['Minimal Knitwear', 'Everyday Essentials'],
        ],
    },
    {
        title: 'Women’s Collection',
        ref: 'RD-WC-03',
        tone: 'bg-ink text-paper',
        rule: 'border-paper/40',
        items: [
            ['Fluid Dress', 'Minimal Blazer', 'Soft Knit Set'],
            ['Everyday Top', 'Wide Pants', 'Reignite District Studio Series'],
        ],
    },
    {
        title: 'Accessories',
        ref: 'RD-AC-04',
        tone: 'bg-hazard text-ink',
        rule: 'border-ink',
        items: [
            ['Signature Tote', 'Minimal Cap', 'Canvas Belt'],
            ['Reignite District Socks', 'Metal Keychain'],
        ],
    },
];

const Home = () => {
    const mainRef = useRef()
    const carouselImages = useMemo(() => ["https://picsum.photos/200/300?random=1", "https://picsum.photos/200/300?random=2", "https://picsum.photos/200/300?random=3"], []);
    const videos = useMemo(() => [video1, video2, video3], []);
    const [blogs, setBlogs] = useState([]);
    const [loadingBlogs, setLoadingBlogs] = useState(true);
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const { setIsLoading } = useLoading();

    // Reset loading state when component mounts
    useEffect(() => {
        setIsLoading(true);
        setImagesLoaded(false);
    }, [setIsLoading]);
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
                setIsLoading(true);
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
    }, [setIsLoading]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoadingProducts(true);
                setIsLoading(true);
                const data = await productAPI.getAvailable();
                setProducts(data);
            } catch (err) {
                console.error('Error fetching products:', err);
                // Don't show error, just use empty array
                setProducts([]);
            } finally {
                setLoadingProducts(false);
            }
        };

        fetchProducts();
    }, [setIsLoading]);

    // Track carousel images loading
    useEffect(() => {
        let loadedCount = 0;
        const totalImages = carouselImages.length;
        let isCompleted = false;

        if (totalImages === 0) {
            setImagesLoaded(true);
            return;
        }

        const imagePromises = carouselImages.map((src) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => {
                    if (!isCompleted) {
                        loadedCount++;
                        if (loadedCount === totalImages) {
                            isCompleted = true;
                            setImagesLoaded(true);
                        }
                    }
                    resolve();
                };
                img.onerror = () => {
                    if (!isCompleted) {
                        loadedCount++;
                        if (loadedCount === totalImages) {
                            isCompleted = true;
                            setImagesLoaded(true);
                        }
                    }
                    resolve();
                };
                img.src = src;
            });
        });

        Promise.all(imagePromises);

        // Fallback timeout: if images don't load within 5 seconds, mark as loaded
        const fallbackTimer = setTimeout(() => {
            if (!isCompleted) {
                isCompleted = true;
                setImagesLoaded(true);
            }
        }, 5000);

        return () => clearTimeout(fallbackTimer);
    }, [carouselImages]);

    // Check if everything is fully loaded and update global loading state
    useEffect(() => {
        const allDataLoaded = !loadingBlogs && !loadingProducts;
        const allAssetsLoaded = imagesLoaded;

        if (allDataLoaded && allAssetsLoaded) {
            // Small delay to ensure smooth transition
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 500);
            return () => clearTimeout(timer);
        } else if (loadingBlogs || loadingProducts) {
            // Keep loading state true while fetching data
            setIsLoading(true);
        }
    }, [loadingBlogs, loadingProducts, imagesLoaded, setIsLoading]);

    // Maximum loading time fallback (10 seconds)
    useEffect(() => {
        const maxLoadingTimer = setTimeout(() => {
            setIsLoading(false);
        }, 10000);

        return () => clearTimeout(maxLoadingTimer);
    }, [setIsLoading]);
    return (
        <main className="mx-auto font-body h-full bg-paper text-ink">
            {/* Hero */}
            <section className='relative w-full min-h-screen pt-12 flex flex-col'>
                {/* Telemetry strip */}
                <div className="grid grid-cols-2 md:grid-cols-4 border-b border-ink micro">
                    <span className="px-4 py-2 border-r border-ink">[ Reignite District ]</span>
                    <span className="px-4 py-2 md:border-r border-ink">Unit / RD-01</span>
                    <span className="hidden md:block px-4 py-2 border-r border-ink">Malang, ID — 7.98°S 112.63°E</span>
                    <span className="hidden md:block px-4 py-2 text-right">Rev {new Date().getFullYear()}.1</span>
                </div>

                <div className="flex-1 grid grid-cols-1 lg:grid-cols-12">
                    {/* Macro type */}
                    <div className="lg:col-span-7 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-ink p-4 md:p-8">
                        <p className="micro max-w-xs">
                            Streetwear manufactured for the ones who refuse to dim. Series 01 now in circulation.
                        </p>
                        <h1 className="macro text-[clamp(4.5rem,13.5vw,15rem)] my-10 lg:my-0">
                            Reignite<br />
                            District<sup className="text-hazard text-[0.3em] align-top">®</sup>
                        </h1>
                        <div className="flex items-end justify-between gap-6">
                            <SplitText
                                Tag='h2'
                                text='/// Overpower The World'
                                type='words'
                                stagger={0.04}
                                fromY={20}
                                duration={0.8}
                                delay={1}
                                ease='power3.out'
                                className='micro text-sm! font-bold'
                            />
                            <Link to="/catalog" className="btn-ink shrink-0">
                                Catalog <span aria-hidden="true">&gt;&gt;&gt;</span>
                            </Link>
                        </div>
                    </div>

                    {/* Image frame */}
                    <div className="lg:col-span-5 p-4 md:p-8 flex flex-col gap-3">
                        <div className="flex justify-between micro">
                            <span>Fig. 01 — Field Documentation</span>
                            <span className="text-hazard">● REC</span>
                        </div>
                        <div className="crosshairs flex-1 min-h-[45vh] border border-ink">
                            <ImageCarousel images={carouselImages} interval={5000} />
                        </div>
                    </div>
                </div>

                <div className="hazard-stripe h-3 w-full border-y border-ink" aria-hidden="true" />
            </section>

            {/* About */}
            <section className="relative w-full">
                <section ref={mainRef} className="w-full h-screen relative overflow-hidden">
                    {/* Brand Intro */}
                    <div className="w-72 absolute right-5 top-20">
                        <p className="micro mb-3">[ Index / Manifest ]</p>
                        <p className="macro text-5xl">Reignite District<span className="text-hazard">®</span></p>
                        <p className="micro mt-3 opacity-70">
                            Reignite District overpower the world
                        </p>
                    </div>

                    {collections.map((collection, i) => (
                        <article key={collection.title} className="absolute top-16 left-0 w-full h-full">
                            <div className={`relative h-[80%] w-full md:w-[70%] border-2 border-ink overflow-hidden flex flex-col ${collection.tone}`}>
                                <div className={`flex justify-between border-b ${collection.rule} px-4 py-2 micro`}>
                                    <span>[ Collection {String(i + 1).padStart(2, '0')} / {String(collections.length).padStart(2, '0')} ]</span>
                                    <span>Ref {collection.ref}</span>
                                </div>
                                <h3 className="macro text-[clamp(3rem,8vw,8rem)] p-4 relative z-10">{collection.title}</h3>
                                <span
                                    className="macro absolute -right-4 -bottom-10 text-[clamp(10rem,28vw,26rem)] opacity-15 pointer-events-none select-none"
                                    aria-hidden="true"
                                >
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <div className={`mt-auto relative z-10 grid grid-cols-1 sm:grid-cols-2 border-t ${collection.rule}`}>
                                    {collection.items.map((column, c) => (
                                        <ul key={c} className={`px-4 py-3 micro space-y-1.5 ${c === 0 ? `sm:border-r ${collection.rule}` : ''}`}>
                                            {column.map(item => (
                                                <li key={item}><span className="opacity-50">&gt;&gt;&gt;</span> {item}</li>
                                            ))}
                                        </ul>
                                    ))}
                                </div>
                            </div>
                        </article>
                    ))}
                </section>
            </section>

            {/* Portfolio */}
            <section id='portfolio' className='w-full py-16 md:py-24'>
                <SectionHeader index="02" label="Inventory / Latest" title="Latest Products" meta={`${Math.min(products.length, 9)} units listed`} />
                {products.length > 0 ? (
                    <div className='grid-rule grid-cols-2 md:grid-cols-3 border-x-0 border-t-0'>
                        {products.slice(0, 9).map((product, i) => {
                            // Get the first image from the product's images array
                            const productImage = product.images && product.images.length > 0 ? product.images[0] : null;

                            if (!productImage) return null;

                            return (
                                <Link to={'/catalog'} key={product._id} className='group bg-paper flex flex-col'>
                                    <div className='aspect-4/5 overflow-hidden halftone'>
                                        <img
                                            src={productImage}
                                            alt={product.name || `Product ${product._id}`}
                                            className='w-full h-full object-cover print-img group-hover:filter-none transition-[filter] duration-150'
                                        />
                                    </div>
                                    <div className='flex items-center justify-between gap-2 border-t border-ink px-3 py-2 micro group-hover:bg-ink group-hover:text-paper'>
                                        <span className='truncate'>[ {String(i + 1).padStart(3, '0')} ] {product.name}</span>
                                        <span aria-hidden="true">&gt;</span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <p className="micro px-5 py-10 border-b border-ink">
                        [ Null ] — No products available at the moment.
                    </p>
                )}
            </section>

            {/* Blog */}
            <section id='blog' className='w-full pb-16 md:pb-24'>
                <SectionHeader index="03" label="Archive / Journal" title="Our Journals" meta={`${blogs.length} entries`} />
                {blogs.length > 0 ? (
                    <ol>
                        {blogs.map((blog, i) => {
                            const previewText = blog.content ? blog.content.substring(0, 100) + '...' : '';
                            return (
                                <li key={blog._id} className='border-b border-ink'>
                                    <Link
                                        to={`/blog/${blog._id}`}
                                        className='group grid grid-cols-12 items-stretch hover:bg-ink hover:text-paper transition-colors duration-100'
                                    >
                                        <span className='col-span-2 md:col-span-1 border-r border-current/30 p-3 md:p-5 macro text-2xl md:text-4xl text-hazard'>
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                        <div className='col-span-4 md:col-span-2 border-r border-current/30 halftone overflow-hidden'>
                                            <img
                                                src={blog.image}
                                                alt={blog.title}
                                                className='object-cover w-full h-full min-h-28 print-img'
                                            />
                                        </div>
                                        <div className='col-span-6 md:col-span-8 p-3 md:p-5 flex flex-col justify-between gap-3'>
                                            <p className='macro text-xl md:text-4xl'>
                                                {blog.title ? (blog.title.length > 50 ? blog.title.substring(0, 50) + '...' : blog.title) : 'Untitled'}
                                            </p>
                                            <p className='hidden md:block text-xs leading-relaxed max-w-2xl opacity-70'>
                                                {previewText}
                                            </p>
                                        </div>
                                        <span className='hidden md:flex col-span-1 items-center justify-center border-l border-current/30 micro'>
                                            Read &gt;&gt;
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ol>
                ) : null}
            </section>

            {/* Video section */}
            {/* <section className='w-full px-5 lg:px-20 py-10 h-fit lg:h-screen flex flex-col lg:flex-row gap-10 items-center justify-center'>
                {Array.isArray(videos) && videos.length > 0 ? (
                    videos.map((url, idx) => (
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload='metadata'
                            key={idx}
                            className='w-full max-w-96 h-auto object-contain'
                            style={{ background: '#222' }}
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
            </section> */}

            {/* CTA */}
            <SiteFooter />
        </main>
    )
}

export default Home
