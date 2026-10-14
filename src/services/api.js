import axios from "axios";
import { mockProducts, mockBlogs } from "./mockData.js";

const API_BASE_URL = "http://localhost:5000/api";
// const API_BASE_URL = "https://gloam-backend.vercel.app/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Product API calls
const realProductAPI = {
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

// Blog API calls
const realBlogAPI = {
  // Get all blogs
  getAll: async () => {
    const response = await api.get("/blogs");
    return response.data;
  },

  // Get single blog by ID
  getById: async (id) => {
    const response = await api.get(`/blogs/${id}`);
    return response.data;
  },

  // Create new blog
  create: async (blogData) => {
    const response = await api.post("/blogs", blogData);
    return response.data;
  },

  // Update blog
  update: async (id, blogData) => {
    const response = await api.put(`/blogs/${id}`, blogData);
    return response.data;
  },

  // Delete blog
  delete: async (id) => {
    const response = await api.delete(`/blogs/${id}`);
    return response.data;
  },
};


// ---------------------------------------------------------------------------
// Mock mode: set VITE_USE_MOCK=true (e.g. in .env.local) to serve data from
// services/mockData.js instead of the backend. Writes are kept in memory only.
// ---------------------------------------------------------------------------
const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

const MOCK_LATENCY_MS = 400;

const respond = (data) =>
  new Promise((resolve) =>
    setTimeout(() => resolve(structuredClone(data)), MOCK_LATENCY_MS)
  );

const notFound = (resource, id) => {
  const error = new Error(`${resource} ${id} not found`);
  error.response = { status: 404 };
  return Promise.reject(error);
};

const createMockStore = (resource, seed) => {
  let records = structuredClone(seed);

  const findIndex = (id) => records.findIndex((record) => record._id === id);

  return {
    all: () => respond(records),
    filter: (predicate) => respond(records.filter(predicate)),
    byId: (id) => {
      const index = findIndex(id);
      return index === -1 ? notFound(resource, id) : respond(records[index]);
    },
    create: (data) => {
      const record = {
        ...data,
        _id: `${resource}-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      records = [record, ...records];
      return respond(record);
    },
    update: (id, data) => {
      const index = findIndex(id);
      if (index === -1) return notFound(resource, id);
      records[index] = { ...records[index], ...data };
      return respond(records[index]);
    },
    remove: (id) => {
      const index = findIndex(id);
      if (index === -1) return notFound(resource, id);
      records = records.filter((record) => record._id !== id);
      return respond({ message: `${resource} deleted` });
    },
  };
};

const createMockAPIs = () => {
  const products = createMockStore("product", mockProducts);
  const blogs = createMockStore("blog", mockBlogs);

  return {
    productAPI: {
      getAll: products.all,
      getAvailable: () =>
        products.filter((product) => product.isAvailable && product.stock > 0),
      getById: products.byId,
      create: products.create,
      update: products.update,
      delete: products.remove,
      uploadImages: products.byId,
    },
    blogAPI: {
      getAll: blogs.all,
      getById: blogs.byId,
      create: blogs.create,
      update: blogs.update,
      delete: blogs.remove,
    },
  };
};

const mockAPIs = USE_MOCK ? createMockAPIs() : null;

export const productAPI = mockAPIs?.productAPI ?? realProductAPI;
export const blogAPI = mockAPIs?.blogAPI ?? realBlogAPI;

export default api;
