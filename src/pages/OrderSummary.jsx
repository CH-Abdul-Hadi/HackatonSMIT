import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

const OrderSummary = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  // Fetch single product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  // Handle add to cart using context
  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      productTitle: product.title,
      imageSrc1: product.image,
      imageSrc2: product.image,
      Description: product.category,
      price: product.price,
    });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Loading product details...</p>
      </div>
    );

  if (!product)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Product not found 😔</p>
      </div>
    );

  return (
    <div className="min-h-screen relative left-3 top-20 w-[82rem] py-12 px-4 flex justify-center rounded-xl bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950  transition-colors">
      <div className="bg-white rounded-2xl shadow-lg max-w-5xl w-full flex flex-col md:flex-row overflow-hidden">
        <div className="flex justify-center items-center bg-gray-100 md:w-1/2 p-6">
          <img
            src={product.image}
            alt={product.title}
            className="w-72 h-72 object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Product Info */}
        <div className="p-8 md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              {product.title}
            </h1>
            <p className="text-gray-500 text-sm mb-6">{product.description}</p>

            <div className="flex items-center gap-2 mb-6">
              <span className="text-yellow-400 text-xl">⭐</span>
              <p className="text-gray-600">
                {product.rating?.rate} ({product.rating?.count} reviews)
              </p>
            </div>

            <p className="text-3xl font-semibold text-blue-600 mb-6">
              ${product.price}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={() => window.history.back()}
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;