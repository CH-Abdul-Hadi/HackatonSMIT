import React from "react";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, addToCart, decreaseFromCart, removeFromCart } = useCart();

  // Log cartItems to verify state
  console.log("Cart Items:", cartItems);

  // Increment item quantity
  const handleIncrease = (item) => {
    console.log("Increasing item:", item);
    addToCart(item); // Pass the full item object to addToCart
  };

  // Decrease item quantity, remove if count becomes 0
  const handleDecrease = (productId) => {
    console.log("Decreasing item with productId:", productId);
    const item = cartItems.find((i) => i.productId === productId);
    if (!item) {
      console.warn("Item not found in cart:", productId);
      return;
    }
    if (item.count > 1) {
      decreaseFromCart(productId); // Decrement quantity by 1
    } else {
      removeFromCart(productId); // Remove item if count would be 0
    }
  };

  // Remove item entirely
  const handleRemove = (productId) => {
    console.log("Removing item with productId:", productId);
    removeFromCart(productId); // Remove item from cart
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.price || 0) * (item.count || 1),
    0
  );

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center text-gray-600 py-20">
            <p className="text-lg">Your cart is currently empty 🛒</p>
            <Link to="/">
              <a className="mt-4 inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
                Continue Shopping
              </a>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-md">
              {cartItems.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center justify-between border-b border-gray-200 py-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.imageSrc1 || "placeholder.jpg"}
                      alt={item.productTitle || "Product"}
                      className="w-20 h-20 object-contain rounded-lg"
                    />
                    <div>
                      <h3 className="text-gray-800 font-semibold">
                        {item.productTitle || "Unknown Product"}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        ${(item.price || 0).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded-lg px-2">
                      <button
                        onClick={() => handleDecrease(item.productId)}
                        className="p-1 hover:text-blue-600"
                      >
                        <FiMinus />
                      </button>
                      <span className="px-3 text-gray-800 font-medium">
                        {item.count || 1}
                      </span>
                      <button
                        onClick={() => handleIncrease(item)}
                        className="p-1 hover:text-blue-600"
                      >
                        <FiPlus />
                      </button>
                    </div>

                    <span className="w-20 text-right font-semibold text-gray-800">
                      ${((item.price || 0) * (item.count || 1)).toFixed(2)}
                    </span>

                    <button
                      onClick={() => handleRemove(item.productId)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-white p-6 rounded-2xl shadow-md h-fit">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Order Summary
              </h2>
              <div className="flex justify-between text-gray-600 mb-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 mb-2">
                <span>Shipping</span>
                <span>$5.00</span>
              </div>
              <div className="flex justify-between text-gray-800 font-semibold text-lg border-t border-gray-200 pt-3">
                <span>Total</span>
                <span>${(subtotal + 5).toFixed(2)}</span>
              </div>

              <button
                className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                onClick={() => {
                  alert("Order placed Successfully");
                    handleRemove(item);
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
