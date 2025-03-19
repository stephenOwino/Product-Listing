import Image from "next/image";
import { motion } from "framer-motion";

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  description: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  toggleWishlist: () => void;
}

export default function ProductCard({
  product,
  isWishlisted,
  toggleWishlist,
}: ProductCardProps) {
  return (
    <motion.div
      className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Image
        src={product.image}
        alt={product.title}
        width={200}
        height={200}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="mt-2">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {product.title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {product.category}
        </p>
        <p className="text-gray-700 dark:text-gray-200">{product.description}</p>
        <p className="text-xl font-bold mt-2 text-gray-900 dark:text-white">
          ${product.price}
        </p>
        <button
          onClick={toggleWishlist}
          className={`mt-2 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            isWishlisted
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        </button>
      </div>
    </motion.div>
  );
}