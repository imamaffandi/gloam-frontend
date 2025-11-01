import React, { useState, useEffect } from 'react';
import { productAPI } from '../services/api';

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
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-800"></div>
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
        <main className='flex items-center justify-around flex-wrap gap-6 p-8'>
            {products.length === 0 ? (
                <div className="w-full text-center py-12">
                    <p className="text-gray-500 text-lg">No products available at the moment.</p>
                </div>
            ) : (
                products.map((product) => (
                    <div key={product._id} className="w-60 h-80 bg-gray-50 p-3 flex flex-col gap-1 rounded-2xl">
                        <div className="h-48 bg-gray-700 rounded-xl overflow-hidden">
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
                                </div>
                                <span className="font-bold text-red-600">${product.price?.toFixed(2) || '0.00'}</span>
                            </div>
                            <button className="hover:dark cursor-pointer text-gray-50 bg-dark/70 py-2 rounded-md transition-colors hover:bg-dark">
                                Add to cart
                            </button>
                        </div>
                    </div>
                ))
            )}
        </main>
    );
};

export default Catalog;