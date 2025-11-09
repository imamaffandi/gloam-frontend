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

    const categories = ['Shirt', 'Pants', 'Hoodies', 'Jacket', 'T-shirt', 'Accessories'];
    const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    const availableColors = ['Black', 'White', 'Gray', 'Navy', 'Red', 'Blue', 'Green', 'Brown', 'Beige'];

    useEffect(() => {
        fetchProducts();
    }, []);
    useEffect(() => {
        document.body.style.overflow = showForm ? "hidden" : "auto";
    }, [showForm]);
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
        <div className="bg-neutral-50 min-h-screen w-full font-body text-neutral-800">
            {/* Header */}
            <header className="sticky top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-10 border-b border-neutral-200">
                <div className="w-full px-8 py-5 flex justify-between items-center">
                    <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
                        Gloam Admin
                    </h1>
                    <button
                        onClick={() => setShowForm(true)}
                        className="px-6 py-3 rounded-lg bg-neutral-900 text-white font-medium hover:bg-neutral-700 transition-all shadow-md active:scale-95"
                    >
                        + Add Product
                    </button>
                </div>
            </header>

            <main className="container mx-auto px-6 py-10 space-y-10">
                {/* Product List */}
                <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
                    <div className="flex items-center justify-between p-6 border-b border-neutral-100">
                        <h2 className="text-2xl font-semibold text-neutral-900">
                            Product Inventory
                        </h2>
                        <p className="text-sm text-neutral-500">
                            {products.length} {products.length === 1 ? "item" : "items"}
                        </p>
                    </div>

                    {products.length === 0 ? (
                        <div className="p-12 text-center text-neutral-500">
                            No products found. Create your first one!
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead className="bg-neutral-100 text-neutral-600">
                                    <tr>
                                        {["Name", "Category", "Price", "Stock", "Status", "Actions"].map(
                                            (h) => (
                                                <th
                                                    key={h}
                                                    className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider border-b border-neutral-200"
                                                >
                                                    {h}
                                                </th>
                                            )
                                        )}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-100">
                                    {products.map((product) => (
                                        <tr
                                            key={product._id}
                                            className="hover:bg-neutral-50 transition-all"
                                        >
                                            <td className="px-6 py-4 font-medium">{product.name}</td>
                                            <td className="px-6 py-4">{product.category}</td>
                                            <td className="px-6 py-4">${product.price}</td>
                                            <td className="px-6 py-4">{product.stock}</td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-3 py-1 text-xs font-semibold rounded-full ${product.isAvailable
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                        }`}
                                                >
                                                    {product.isAvailable ? "Available" : "Unavailable"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium flex gap-3">
                                                <button
                                                    onClick={() => handleEdit(product)}
                                                    className="text-blue-600 hover:text-blue-800 transition-colors"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product._id)}
                                                    className="text-red-600 hover:text-red-800 transition-colors"
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
            </main>

            {/* MODAL FORM */}
            {showForm && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                    <div className="bg-white/90 backdrop-blur-md border border-neutral-200 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8 relative">
                        <button
                            onClick={resetForm}
                            className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-800 text-2xl"
                        >
                            ×
                        </button>
                        <h2 className="text-2xl font-semibold mb-6 text-neutral-900">
                            {editingProduct ? "Edit Product" : "Create New Product"}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Inputs */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className=" text-sm font-medium text-neutral-700 mb-2">
                                        Product Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className=" text-sm font-medium text-neutral-700 mb-2">
                                        Category *
                                    </label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 outline-none"
                                    >
                                        <option value="">Select category</option>
                                        {categories.map((cat) => (
                                            <option key={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className=" text-sm font-medium text-neutral-700 mb-2">
                                        Price (Rp.)
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className=" text-sm font-medium text-neutral-700 mb-2">
                                        Stock
                                    </label>
                                    <input
                                        type="number"
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 outline-none"
                                    />
                                </div>
                            </div>

                            {/* Sizes */}
                            <div>
                                <label className=" text-sm font-medium text-neutral-700 mb-2">
                                    Sizes
                                </label>
                                <div className="flex flex-wrap gap-4">
                                    {availableSizes.map((size) => (
                                        <label
                                            key={size}
                                            className="flex items-center gap-2 text-sm text-neutral-600"
                                        >
                                            <input
                                                type="checkbox"
                                                name="sizes"
                                                value={size}
                                                checked={formData.sizes.includes(size)}
                                                onChange={handleInputChange}
                                            />
                                            {size}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Colors */}
                            <div>
                                <label className=" text-sm font-medium text-neutral-700 mb-2">
                                    Colors
                                </label>
                                <div className="flex flex-wrap gap-4 mb-3">
                                    {availableColors.map((color) => (
                                        <label
                                            key={color}
                                            className="flex items-center gap-2 text-sm text-neutral-600"
                                        >
                                            <input
                                                type="checkbox"
                                                name="colors"
                                                value={color}
                                                checked={formData.colors.includes(color)}
                                                onChange={handleInputChange}
                                            />
                                            {color}
                                        </label>
                                    ))}
                                </div>
                                <input
                                    type="text"
                                    name="otherColor"
                                    placeholder="Other colors (optional)"
                                    value={formData.otherColor}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 outline-none"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className=" text-sm font-medium text-neutral-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    rows="4"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 outline-none"
                                />
                            </div>

                            {/* Availability */}
                            <label className="flex items-center gap-2 text-sm text-neutral-700">
                                <input
                                    type="checkbox"
                                    name="isAvailable"
                                    checked={formData.isAvailable}
                                    onChange={handleInputChange}
                                />
                                Product is available
                            </label>

                            {/* Image Upload */}
                            <div>
                                <label className=" text-sm font-medium text-neutral-700 mb-3">
                                    Product Images
                                </label>

                                {/* File input */}
                                <input
                                    id="image-input"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleFileInput}
                                    className=" w-full text-sm text-neutral-700 border border-neutral-300 rounded-lg cursor-pointer focus:ring-2 focus:ring-neutral-900 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-neutral-900 file:text-white hover:file:bg-neutral-700"
                                />

                                {/* Main Preview */}
                                {imagePreviews.length > 0 && (
                                    <div className="mt-4">
                                        <div className="w-full h-72 border border-neutral-200 rounded-xl overflow-hidden flex items-center justify-center bg-neutral-100">
                                            <img
                                                src={imagePreviews[0].src}
                                                alt="Main preview"
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Additional Thumbnails */}
                                {imagePreviews.length > 1 && (
                                    <div className="flex gap-2 mt-3 overflow-x-auto">
                                        {imagePreviews.slice(1).map((img, i) => (
                                            <div
                                                key={img.id}
                                                className="relative w-20 h-20 shrink-0 border border-neutral-200 rounded-lg overflow-hidden"
                                            >
                                                <img
                                                    src={img.src}
                                                    alt={img.name}
                                                    className="object-cover w-full h-full"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(i + 1)}
                                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-0.5 text-xs"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-4 pt-6">
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-6 py-2 rounded-lg border border-neutral-300 hover:bg-neutral-100 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 rounded-lg bg-neutral-900 text-white hover:bg-neutral-700 transition-all active:scale-95"
                                >
                                    {editingProduct ? "Update Product" : "Create Product"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>

    );
};

export default Admin;

