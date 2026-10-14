import React, { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { blogAPI } from '../services/api'
import { SiteFooter } from '../components'
import { useLoading } from '../context/LoadingContext';

const Blog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { setIsLoading } = useLoading();
    const mediaRef = useRef(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                setLoading(true);
                setIsLoading(true);
                setError(null);
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

    // Auto-play media when blog loads
    useEffect(() => {
        if (blog && blog.media && mediaRef.current) {
            // Auto-play media when blog loads
            mediaRef.current.play().catch(err => {
                console.log('Auto-play prevented:', err);
                // Some browsers prevent auto-play, that's okay
            });
        }
    }, [blog]);

    // Show loading state
    if (loading) {
        return null; // Loading component will handle this
    }

    // Show error only after loading is complete
    if (error || !blog) {
        return (
            <main className='min-h-screen w-full font-body flex flex-col items-center justify-center p-5 gap-6'>
                <div role="alert" className="border-2 border-hazard max-w-md w-full">
                    <p className="bg-hazard text-paper micro px-3 py-1.5">[ Error / 404 ] Record Not Found</p>
                    <p className="p-4 text-sm">{error || 'Blog post not found'}</p>
                </div>
                <Link to={"/"} className='btn-ink'>
                    <span aria-hidden="true">&lt;&lt;&lt;</span> Back to Home
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
        <main className='min-h-screen w-full font-body relative bg-paper text-ink pt-12'>
            <div className="flex items-stretch justify-between border-b border-ink micro">
                <Link to={"/"} className='px-4 py-2 border-r border-ink hover:bg-ink hover:text-paper'>
                    &lt;&lt;&lt; Back
                </Link>
                <span className="px-4 py-2 truncate">Journal / Entry {String(id).slice(-6).toUpperCase()}</span>
            </div>

            <header className="grid grid-cols-1 lg:grid-cols-12 border-b-2 border-ink">
                <div className="lg:col-span-7 p-4 md:p-8 flex flex-col justify-end gap-6 border-b lg:border-b-0 lg:border-r border-ink">
                    <p className="micro text-hazard">[ Archive / Journal ]</p>
                    <h1 className='macro text-[clamp(3rem,8vw,8rem)] wrap-break-word'>
                        {blog.title}
                    </h1>
                </div>
                {blog.image && (
                    <figure className="lg:col-span-5 p-4 md:p-8">
                        <div className="crosshairs border border-ink halftone">
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className='w-full h-[50vh] lg:h-[70vh] object-cover print-img'
                            />
                        </div>
                        <figcaption className="micro mt-3 opacity-60">Fig. 01 — {blog.title}</figcaption>
                    </figure>
                )}
            </header>

            <div className='grid grid-cols-1 md:grid-cols-12'>
                <aside className="md:col-span-3 border-b md:border-b-0 md:border-r border-ink p-4 md:p-8 micro space-y-2">
                    <p>Ref / {String(id).slice(-6).toUpperCase()}</p>
                    {blog.mediaType && <p>Media / {blog.mediaType}</p>}
                    <span className="barcode block h-6 w-24 mt-4" aria-hidden="true" />
                </aside>

                <article className="md:col-span-9 p-4 md:p-8">
                    {/* Media Player (Audio/Video) */}
                    {blog.media && blog.mediaType && (
                        <div className='mb-8 w-full border border-ink'>
                            <p className="micro bg-ink text-paper px-3 py-1.5">
                                ▶ Playback / {blog.mediaType}
                            </p>
                            {blog.mediaType === 'audio' ? (
                                <audio
                                    ref={mediaRef}
                                    controls
                                    autoPlay
                                    className='w-full'
                                >
                                    <source src={blog.media} type="audio/mpeg" />
                                    <source src={blog.media} type="audio/wav" />
                                    <source src={blog.media} type="audio/ogg" />
                                    Your browser does not support the audio tag.
                                </audio>
                            ) : blog.mediaType === 'video' ? (
                                <video
                                    ref={mediaRef}
                                    controls
                                    autoPlay
                                    className='w-full'
                                >
                                    <source src={blog.media} type="video/mp4" />
                                    <source src={blog.media} type="video/webm" />
                                    <source src={blog.media} type="video/ogg" />
                                    Your browser does not support the video tag.
                                </video>
                            ) : null}
                        </div>
                    )}

                    <p className='text-sm leading-relaxed max-w-3xl whitespace-pre-line'>
                        {formatContent(blog.content)}
                    </p>
                </article>
            </div>

            {/* CTA */}
            <SiteFooter instagram="gloamingmistake" email="gloamingmistake@gmail.com" />
        </main>
    )
}

export default Blog
