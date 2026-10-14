import React, { useState, useEffect } from 'react';
import { productAPI } from '../services/api';
import { useLoading } from '../context/LoadingContext';
import { SplitText, SiteFooter } from '../components'

const ProductCard = ({ product, index }) => {
    const [hoveredImageIndex, setHoveredImageIndex] = useState(0);
    const hasMultipleImages = product.images && product.images.length > 1;
    const images = product.images || [];

    return (
        <article className="bg-paper flex flex-col">
            <div className="flex justify-between border-b border-ink px-3 py-1.5 micro">
                <span>[ {String(index + 1).padStart(3, '0')} ]</span>
                <span className="opacity-60">{product.category}</span>
            </div>
            <div
                className="aspect-square overflow-hidden relative bg-paper-2 halftone"
                onMouseEnter={() => hasMultipleImages && setHoveredImageIndex(1)}
                onMouseLeave={() => hasMultipleImages && setHoveredImageIndex(0)}
            >
                {images.length > 0 ? (
                    images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            className={`absolute inset-0 w-full h-full object-contain print-img transition-opacity duration-150 ease-linear ${index === hoveredImageIndex ? 'opacity-100' : 'opacity-0'
                                }`}
                            alt={product.name}
                        />
                    ))
                ) : (
                    <div className="w-full h-full flex items-center justify-center micro opacity-50">
                        [ No Image ]
                    </div>
                )}
                {hasMultipleImages && (
                    <span className="absolute top-0 right-0 z-10 bg-ink text-paper micro px-2 py-1">
                        {String(hoveredImageIndex + 1).padStart(2, '0')}/{String(images.length).padStart(2, '0')}
                    </span>
                )}
            </div>
            <div className="border-t border-ink p-3 flex flex-col gap-3 flex-1">
                <h3 className="macro text-2xl">{product.name}</h3>
                <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 micro">
                    {product.stock !== undefined && (
                        <>
                            <dt className="opacity-50">Stock</dt>
                            <dd><data value={product.stock}>{product.stock}</data></dd>
                        </>
                    )}
                    {product.sizes && product.sizes.length > 0 && (
                        <>
                            <dt className="opacity-50">Size</dt>
                            <dd>
                                {product.sizes.slice(0, 3).join(' / ')}
                                {product.sizes.length > 3 && ' …'}
                            </dd>
                        </>
                    )}
                    {product.colors && product.colors.length > 0 && (
                        <>
                            <dt className="opacity-50">Color</dt>
                            <dd>
                                {product.colors.slice(0, 2).join(' / ')}
                                {product.colors.length > 2 && ' …'}
                            </dd>
                        </>
                    )}
                </dl>
                <data value={product.price || 0} className="mt-auto font-bold text-hazard text-lg tabular-nums">
                    {product.price
                        ? product.price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })
                        : "Rp0"}
                </data>
            </div>
            <a
                href={`https://api.whatsapp.com/send?phone=6281232179590&text=Saya%20mau%20pesan%20${product.name}%20apa%20masih%20ready?`}
                target='_blank'
                rel="noopener noreferrer"
                className="btn-ink justify-between border-x-0 border-b-0"
            >
                <span>Chat Seller</span>
                <span aria-hidden="true">&gt;&gt;&gt;</span>
            </a>
        </article>
    );
};

const Catalog = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { setIsLoading } = useLoading();
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setIsLoading(true);
            const data = await productAPI.getAvailable();
            setProducts(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching products:', err);
            setError('Failed to load products. Please try again later.');
        } finally {
            setLoading(false);
            setIsLoading(false);
        }
    };

    if (error) {
        return (
            <main className="flex items-center justify-center min-h-screen p-5">
                <div role="alert" className="border-2 border-hazard max-w-md w-full">
                    <p className="bg-hazard text-paper micro px-3 py-1.5">[ Error / 500 ] Fetch Failure</p>
                    <p className="p-4 text-sm">{error}</p>
                </div>
            </main>
        );
    }

    return (
        <main className="font-body bg-paper text-ink">
            {/* Hero */}
            <section className='relative w-full min-h-[85vh] pt-12 flex flex-col border-b-2 border-ink'>
                <div className="grid grid-cols-2 md:grid-cols-4 border-b border-ink micro">
                    <span className="px-4 py-2 border-r border-ink">[ Catalog ]</span>
                    <span className="px-4 py-2 md:border-r border-ink">Doc / RD-CAT</span>
                    <span className="hidden md:block px-4 py-2 border-r border-ink">Series 01 — In Circulation</span>
                    <span className="hidden md:block px-4 py-2 text-right">
                        {loading ? 'Querying…' : `${products.length} Units`}
                    </span>
                </div>
                <div className="flex-1 flex flex-col justify-end p-4 md:p-8 gap-8">
                    <h1 className="macro text-[clamp(4.5rem,15vw,17rem)]">
                        The<br />Catalog<span className="text-hazard">.</span>
                    </h1>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-t border-ink pt-4">
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
                        <p className="text-sm max-w-md">
                            Explore our latest collections — designed for simplicity, purpose, and movement.
                        </p>
                    </div>
                </div>
            </section>

            <section className='py-10 md:py-16'>
                {products.length === 0 ? (
                    <p className="micro px-5 py-12 border-y border-ink">
                        [ Null ] — No products available at the moment.
                    </p>
                ) : (
                    <div className='grid-rule grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-x-0'>
                        {products.map((product, i) => (
                            <ProductCard key={product._id} product={product} index={i} />
                        ))}
                    </div>
                )}
            </section>

            {/* CTA */}
            <SiteFooter />
        </main>
    );
};

export default Catalog;
