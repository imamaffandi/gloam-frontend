import React, { useState, useEffect } from 'react';
import { productAPI } from '../services/api';
import { Glare } from '../components';
import { useLoading } from '../context/LoadingContext';

const ProductCard = ({ product }) => {
    const [hoveredImageIndex, setHoveredImageIndex] = useState(0);
    const hasMultipleImages = product.images && product.images.length > 1;
    const images = product.images || [];

    return (
        <div className="w-60 h-80 shadow p-3 flex flex-col gap-1">
            <div
                className="h-48 shadow overflow-hidden relative"
                onMouseEnter={() => hasMultipleImages && setHoveredImageIndex(1)}
                onMouseLeave={() => hasMultipleImages && setHoveredImageIndex(0)}
            >
                {images.length > 0 ? (
                    images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ease-in-out ${index === hoveredImageIndex ? 'opacity-100' : 'opacity-0'
                                }`}
                            alt={product.name}
                        />
                    ))
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col">
                        <span className="text-xl font-bold">{product.name}</span>
                        <p className="text-xs text-gray-700 capitalize">{product.category}</p>
                        <div className='flex items-center gap-2 flex-wrap mt-1'>
                            {product.stock !== undefined && (
                                <p className="text-xs text-gray-600">Stock: {product.stock}</p>
                            )}
                            {product.sizes && product.sizes.length > 0 && (
                                <p className="text-xs text-gray-600">
                                    Size: {product.sizes.slice(0, 3).join(', ')}
                                    {product.sizes.length > 3 && '...'}
                                </p>
                            )}
                            {product.colors && product.colors.length > 0 && (
                                <p className="text-xs text-gray-600">
                                    Color: {product.colors.slice(0, 2).join(', ')}
                                    {product.colors.length > 2 && '...'}
                                </p>
                            )}
                        </div>
                        <span className="font-bold text-red-600">  {product.price
                            ? product.price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })
                            : "Rp0"}</span>
                    </div>
                </div>
                <a href={`https://api.whatsapp.com/send?phone=6281232179590&text=Saya%20mau%20pesan%20${product.name}%20apa%20masih%20ready?`} target='_blank' className="text-center cursor-pointer text-gray-50 bg-dark/70 py-2 rounded-md transition-colors hover:bg-dark">
                    Chat Seller
                </a>
            </div>
        </div>
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
            <main className="flex items-center justify-center min-h-screen">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            </main>
        );
    }

    return (
        <>
            {/* Header */}
            <section className="text-center font-body my-16 pt-20">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight">The Catalog</h1>
                <p className="text-sm md:text-base text-neutral-500 mt-3">
                    Explore our latest collections — designed for simplicity, purpose, and movement.
                </p>
            </section>

            <main className='font-body flex items-center justify-around flex-wrap gap-6 p-8'>
                {products.length === 0 ? (
                    <div className="w-full text-center py-12">
                        <p className="text-gray-500 text-lg">No products available at the moment.</p>
                    </div>
                ) : (
                    products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))
                )}
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
        </>
    );
};

export default Catalog;