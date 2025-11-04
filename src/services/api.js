import axios from "axios";

// const API_BASE_URL = "http://localhost:5000/api";
const API_BASE_URL = "https://gloam-backend.vercel.app/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Product API calls
export const productAPI = {
  // Get all products
  getAll: async () => {
    const response = await api.get("/products");
    return response.data;
  },

  // Get available products only
  getAvailable: async () => {
    const response = await api.get("/products/available");
    return response.data;
  },

  // Get single product by ID
  getById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Create new product
  create: async (productData) => {
    const response = await api.post("/products", productData);
    return response.data;
  },

  // Update product
  update: async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  // Delete product
  delete: async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },

  // Upload images
  uploadImages: async (id, formData) => {
    const response = await api.post(`/products/${id}/images`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};

export default api;
