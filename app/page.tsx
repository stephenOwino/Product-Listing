"use client";

import { useState, useEffect } from "react";
import { useTheme } from "./context/ThemeContext";
import ProductCard from "../components/ProductCard";
import useSWR from "swr";
import { motion } from "framer-motion";

// Fetcher function for SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  description: string;
  image: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [wishlist, setWishlist] = useState<number[]>([]); // Store product IDs
  const { isDarkMode, toggleDarkMode } = useTheme();

  // Fetch products with SWR
  const { data, error } = useSWR<Product[]>("/data/products.json", fetcher);

  // Unique categories for filter dropdown
  const categories = data ? ["All", ...new Set(data.map((p) => p.category))] : [];

  // Filter products based on search and category
  useEffect(() => {
    if (!data) return;

    let filtered = [...data];

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== "All") {
      filtered = filtered.filter(
        (product) => product.category === categoryFilter
      );
    }

    setProducts(filtered);
  }, [data, searchTerm, categoryFilter]);

  // Toggle wishlist
  const toggleWishlist = (productId: number) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  if (error) return <div className="p-6 text-center">Failed to load products.</div>;
  if (!data) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div
      className={`min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 ${
        isDarkMode ? "dark" : ""
      }`}
    >
      {/* Header */}
      <header className="p-6 flex justify-between items-center border-b dark:border-gray-700">
        <h1 className="text-3xl font-bold">eCommerce Store</h1>
        <button
          onClick={toggleDarkMode}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>

      {/* Filters */}
      <div className="p-6 flex flex-col sm:flex-row gap-4 max-w-7xl mx-auto">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white w-full sm:w-1/2"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white w-full sm:w-1/4"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Wishlist Count */}
      <div className="p-6 max-w-7xl mx-auto">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Wishlist: {wishlist.length} items
        </p>
      </div>

      {/* Product Grid with Animation */}
      <motion.div
        className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlist.includes(product.id)}
              toggleWishlist={() => toggleWishlist(product.id)}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600 dark:text-gray-400">
            No products found.
          </p>
        )}
      </motion.div>
    </div>
  );
}