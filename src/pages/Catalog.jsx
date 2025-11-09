import React, { useState, useEffect } from 'react';
import { productAPI } from '../services/api';
import { Glare } from '../components'
const Catalog = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await productAPI.getAvailable();
            setProducts(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching products:', err);
            setError('Failed to load products. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <main className="flex items-center justify-center min-h-screen">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#000000" className="size-6 animate-spin">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>

            </main>
        );
    }

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
                        <div key={product._id} className="w-60 h-80 bg-gray-50 border border-dark p-3 flex flex-col gap-1 rounded-2xl">
                            <div className="h-48 border border-dark rounded-xl overflow-hidden">
                                {product.images && product.images.length > 0 ? (
                                    <img
                                        src={product.images[0]}
                                        className='w-full h-full object-cover'
                                        alt={product.name}
                                    />
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
                    ))
                )}
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
        </>
    );
};

export default Catalog;