import React, { useState, useEffect } from 'react';
import { productAPI } from '../services/api';

const Admin = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: 'shirt',
        sizes: [],
        colors: [],
        otherColor: '',
        isAvailable: true
    });
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [isDragging, setIsDragging] = useState(false);

    const categories = ['shirt', 'pants', 'hoodies', 'jacket', 'T-shirt', 'accessories'];
    const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    const availableColors = ['Black', 'White', 'Gray', 'Navy', 'Red', 'Blue', 'Green', 'Brown', 'Beige'];

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await productAPI.getAll();
            setProducts(data);
        } catch (err) {
            console.error('Error fetching products:', err);
            alert('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleImageSelect = async (files) => {
        const imageFiles = Array.from(files).filter(file =>
            file.type.startsWith('image/')
        );

        if (imageFiles.length === 0) return;

        const newImages = [...images];
        const newPreviews = [...imagePreviews];

        for (const file of imageFiles) {
            const base64 = await convertToBase64(file);
            newImages.push(base64);
            newPreviews.push({
                src: base64,
                name: file.name,
                id: Date.now() + Math.random()
            });
        }

        setImages(newImages);
        setImagePreviews(newPreviews);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        handleImageSelect(files);
    };

    const handleFileInput = (e) => {
        const files = e.target.files;
        handleImageSelect(files);
    };

    const removeImage = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        const newPreviews = imagePreviews.filter((_, i) => i !== index);
        setImages(newImages);
        setImagePreviews(newPreviews);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === 'sizes') {
            setFormData(prev => {
                const sizes = prev.sizes || [];
                if (checked) {
                    return { ...prev, sizes: [...sizes, value] };
                } else {
                    return { ...prev, sizes: sizes.filter(s => s !== value) };
                }
            });
        } else if (name === 'colors') {
            setFormData(prev => {
                const colors = prev.colors || [];
                if (checked) {
                    return { ...prev, colors: [...colors, value] };
                } else {
                    return { ...prev, colors: colors.filter(c => c !== value) };
                }
            });
        } else if (type === 'checkbox' && name === 'isAvailable') {
            setFormData(prev => ({
                ...prev,
                [name]: checked
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Combine selected colors with other color if provided
            let colors = [...formData.colors];
            if (formData.otherColor && formData.otherColor.trim()) {
                // Split by comma and trim each color
                const otherColors = formData.otherColor.split(',').map(c => c.trim()).filter(c => c);
                colors.push(...otherColors);
            }

            const productData = {
                name: formData.name,
                description: formData.description,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                category: formData.category,
                sizes: formData.sizes,
                colors: colors.filter(c => c),
                images: images,
                isAvailable: formData.isAvailable
            };

            if (editingProduct) {
                await productAPI.update(editingProduct._id, productData);
                alert('Product updated successfully!');
            } else {
                await productAPI.create(productData);
                alert('Product created successfully!');
            }

            resetForm();
            fetchProducts();
        } catch (err) {
            console.error('Error saving product:', err);
            alert('Failed to save product');
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        // Separate predefined colors from other colors
        const predefinedColors = availableColors.filter(c =>
            product.colors && product.colors.some(pc => pc.toLowerCase() === c.toLowerCase())
        );
        const otherColors = product.colors ? product.colors.filter(c =>
            !availableColors.some(ac => ac.toLowerCase() === c.toLowerCase())
        ).join(', ') : '';

        setFormData({
            name: product.name,
            description: product.description,
            price: product.price.toString(),
            stock: product.stock.toString(),
            category: product.category || 'shirt',
            sizes: product.sizes || [],
            colors: predefinedColors,
            otherColor: otherColors,
            isAvailable: product.isAvailable
        });

        // Set images and previews
        if (product.images && product.images.length > 0) {
            setImages(product.images);
            setImagePreviews(product.images.map((img, idx) => ({
                src: img,
                name: `Image ${idx + 1}`,
                id: Date.now() + idx
            })));
        } else {
            setImages([]);
            setImagePreviews([]);
        }

        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await productAPI.delete(id);
                alert('Product deleted successfully!');
                fetchProducts();
            } catch (err) {
                console.error('Error deleting product:', err);
                alert('Failed to delete product');
            }
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            price: '',
            stock: '',
            category: 'shirt',
            sizes: [],
            colors: [],
            otherColor: '',
            isAvailable: true
        });
        setImages([]);
        setImagePreviews([]);
        setEditingProduct(null);
        setShowForm(false);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">Admin Panel</h1>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className={` ${showForm ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"} cursor-pointer text-white px-6 py-3 rounded-lg  transition font-medium`}
                    >
                        {showForm ? 'Cancel' : 'Add New Product'}
                    </button>
                </div>

                {/* Product Form */}
                {showForm && (
                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <h2 className="text-2xl font-bold mb-6">
                            {editingProduct ? 'Edit Product' : 'Create New Product'}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Product Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Category *
                                    </label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                    >
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>
                                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Price ($) *
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        required
                                        step="0.01"
                                        min="0"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Stock *
                                    </label>
                                    <input
                                        type="number"
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleInputChange}
                                        required
                                        min="0"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Sizes
                                    </label>
                                    <div className="flex flex-wrap gap-3">
                                        {availableSizes.map(size => (
                                            <label key={size} className="flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    name="sizes"
                                                    value={size}
                                                    checked={formData.sizes.includes(size)}
                                                    onChange={handleInputChange}
                                                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                />
                                                <span className="ml-2 text-gray-700">{size}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Colors
                                    </label>
                                    <div className="flex flex-wrap gap-3 mb-3">
                                        {availableColors.map(color => (
                                            <label key={color} className="flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    name="colors"
                                                    value={color}
                                                    checked={formData.colors.includes(color)}
                                                    onChange={handleInputChange}
                                                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                />
                                                <span className="ml-2 text-gray-700">{color}</span>
                                            </label>
                                        ))}
                                    </div>
                                    <div>
                                        <label className="block font-medium mb-2 text-sm">
                                            Other Color (optional)
                                        </label>
                                        <input
                                            type="text"
                                            name="otherColor"
                                            value={formData.otherColor}
                                            onChange={handleInputChange}
                                            placeholder="Enter custom color(s), separated by commas"
                                            className="w-full text-gray-400 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Description *
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        required
                                        rows="4"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="isAvailable"
                                            checked={formData.isAvailable}
                                            onChange={handleInputChange}
                                            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-gray-700 font-medium">
                                            Product is available
                                        </span>
                                    </label>
                                </div>
                            </div>
                            {/* Image input */}
                            <div className='h-96 w-96 z-0'>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Images
                                </label>
                                <div
                                    className={`relative w-full aspect-square border-2 border-dashed rounded-lg overflow-hidden ${isDragging
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-300 bg-gray-50 hover:border-gray-400'
                                        } transition-colors cursor-pointer`}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    onClick={() => document.getElementById('image-input').click()}
                                >
                                    {imagePreviews.length > 0 ? (
                                        <div className="relative w-full h-full">
                                            <img
                                                src={imagePreviews[0].src}
                                                alt={imagePreviews[0].name}
                                                className="w-full h-full object-cover"
                                            />
                                            {imagePreviews.length > 1 && (
                                                <div className=" bg-black/70 text-white px-2 py-1 rounded text-xs">
                                                    +{imagePreviews.length - 1}
                                                </div>
                                            )}
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeImage(0);
                                                }}
                                                className="absolute top-2 left-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                            <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <p className="text-sm">Drag & drop images here</p>
                                            <p className="text-xs mt-1">or click to select</p>
                                        </div>
                                    )}
                                    <input
                                        id="image-input"
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleFileInput}
                                        className="hidden"
                                    />
                                </div>
                                {imagePreviews.length > 1 && (
                                    <div className="mt-2 flex gap-2 overflow-x-auto">
                                        {imagePreviews.slice(1).map((preview, index) => (
                                            <div key={preview.id} className="relative shrink-0 w-20 h-20 aspect-square border border-gray-300 rounded overflow-hidden">
                                                <img
                                                    src={preview.src}
                                                    alt={preview.name}
                                                    className="w-full h-full object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index + 1)}
                                                    className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-0.5 hover:bg-red-700 transition"
                                                >
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-4 mt-6">
                                <button
                                    type="submit"
                                    className="bg-green-600 text-white cursor-pointer px-8 py-3 rounded-lg hover:bg-green-700 transition font-medium"
                                >
                                    {editingProduct ? 'Update Product' : 'Create Product'}
                                </button>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="bg-gray-500 text-white cursor-pointer px-8 py-3 rounded-lg hover:bg-gray-600 transition font-medium"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Products List */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <h2 className="text-2xl font-bold p-6 border-b">All Products</h2>

                    {products.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            No products found. Create your first product!
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Category
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Price
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Stock
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {products.map((product) => (
                                        <tr key={product._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {product.name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{product.category}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    ${product.price.toFixed(2)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{product.stock}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${product.isAvailable
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    {product.isAvailable ? 'Available' : 'Unavailable'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button
                                                    onClick={() => handleEdit(product)}
                                                    className="text-blue-600 hover:text-blue-900 mr-4"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product._id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Admin;

