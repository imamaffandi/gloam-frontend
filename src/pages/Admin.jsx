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
        <div className="bg-gray-50 min-h-screen w-full">
            {/* Header */}
            <header className="sticky top-0 left-0 w-full bg-white shadow-sm z-10">
                <div className="w-full px-6 py-4 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
                    <button
                        onClick={() => setShowForm(true)}
                        className="  text-black w-20 h-16 shadow-2xl"
                    >
                        Add Product
                    </button>
                </div>
            </header>

            <main className="container mx-auto px-6 py-10">
                {/* Product List */}
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
                                        {["Name", "Category", "Price", "Stock", "Status", "Actions"].map((h) => (
                                            <th
                                                key={h}
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {products.map((product) => (
                                        <tr key={product._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">{product.name}</td>
                                            <td className="px-6 py-4">{product.category}</td>
                                            <td className="px-6 py-4">${product.price}</td>
                                            <td className="px-6 py-4">{product.stock}</td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-2 py-1 text-xs font-semibold rounded-full ${product.isAvailable
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-red-100 text-red-800"
                                                        }`}
                                                >
                                                    {product.isAvailable ? "Available" : "Unavailable"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium">
                                                <button
                                                    onClick={() => handleEdit(product)}
                                                    className="text-blue-600 hover:text-blue-900 mr-3"
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
            </main>

            {/* MODAL FORM */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-scroll p-6 relative">
                        <button
                            onClick={resetForm}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                        >
                            ✕
                        </button>
                        <h2 className="text-2xl font-bold mb-6">
                            {editingProduct ? "Edit Product" : "Create New Product"}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* --- Inputs --- */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2 bg-white">
                                        Product Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-2 bg-white">
                                        Category *
                                    </label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select category</option>
                                        {categories.map((cat) => (
                                            <option key={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-2 bg-white">
                                        Price ($)
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-2 bg-white">
                                        Stock
                                    </label>
                                    <input
                                        type="number"
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Sizes & Colors */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-2 bg-white">
                                    Sizes
                                </label>
                                <div className="flex flex-wrap gap-3">
                                    {availableSizes.map((size) => (
                                        <label key={size} className="flex items-center gap-2">
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

                            <div>
                                <label className="block text-gray-700 font-medium mb-2 bg-white">
                                    Colors
                                </label>
                                <div className="flex flex-wrap gap-3 mb-2">
                                    {availableColors.map((color) => (
                                        <label key={color} className="flex items-center gap-2">
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
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-600"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-2 bg-white">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    rows="4"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <label className="flex items-center gap-2">
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
                                <label className="block text-gray-700 font-medium mb-2 bg-white">
                                    Images
                                </label>
                                <div
                                    className={`border-2 border-dashed rounded-lg aspect-square flex flex-col justify-center items-center cursor-pointer transition ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
                                        }`}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    onClick={() => document.getElementById("image-input").click()}
                                >
                                    {imagePreviews.length ? (
                                        <img
                                            src={imagePreviews[0].src}
                                            alt=""
                                            className="object-cover w-full h-full rounded-lg"
                                        />
                                    ) : (
                                        <p className="text-gray-400">Drag & drop or click to upload</p>
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
                                    <div className="flex gap-2 mt-2 overflow-x-auto">
                                        {imagePreviews.slice(1).map((img, i) => (
                                            <div
                                                key={img.id}
                                                className="relative w-20 h-20 shrink-0 border rounded overflow-hidden"
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
                                {/* Buttons */}
                                <div className="flex justify-end gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="  px-6 py-2 rounded-lg"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        // className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                                        className=" px-6 py-2 rounded-lg"
                                    >
                                        {editingProduct ? "Update Product" : "Create Product"}
                                    </button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;

