import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { blogAPI } from '../services/api'
import { Glare } from '../components'
import { useLoading } from '../context/LoadingContext';

const Blog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { setIsLoading } = useLoading();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                setLoading(true);
                setIsLoading(true);
                const data = await blogAPI.getById(id);
                setBlog(data);
            } catch (err) {
                console.error('Error fetching blog:', err);
                setError('Failed to load blog post');
            } finally {
                setLoading(false);
                setIsLoading(false);
            }
        };

        if (id) {
            fetchBlog();
        } else {
            setError('No blog ID provided');
            setLoading(false);
            setIsLoading(false);
        }
    }, [id, setIsLoading]);

    if (error || !blog) {
        return (
            <main className='min-h-screen w-full font-body flex flex-col items-center justify-center p-5'>
                <p className='text-red-600 mb-4'>{error || 'Blog post not found'}</p>
                <Link to={"/"} className='flex items-center justify-center gap-2 bg-neutral-900 text-white rounded-xl px-5 py-3 hover:bg-neutral-700 transition-colors'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                    </svg>
                    Back to Home
                </Link>
            </main>
        );
    }

    // Format content with line breaks
    const formatContent = (content) => {
        if (!content) return '';
        return content.split('\n').map((line, index) => (
            <React.Fragment key={index}>
                {line}
                {index < content.split('\n').length - 1 && <br />}
            </React.Fragment>
        ));
    };

    return (
        <main className='min-h-screen w-full font-body relative'>
            <img
                src={blog.image}
                alt={blog.title}
                className='w-full h-[80vh] object-cover'
            />
            <Link
                to={"/"}
                className='absolute left-5 top-5 z-50 flex items-center justify-center gap-2 bg-light rounded-xl px-5 py-3 hover:bg-neutral-100 transition-colors'
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                </svg>
                Back
            </Link>
            <div className='space-y-2 p-5'>
                <h1 className='text-5xl tracking-widest font-semibold'>
                    {blog.title}
                </h1>
                <p className='text-sm tracking-wide whitespace-pre-line'>
                    {formatContent(blog.content)}
                </p>
            </div>
            {/* CTA */}
            <div className="h-fit md:h-screen w-full relative font-body py-10 md:py-0 flex items-center justify-center">
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

export default Blog