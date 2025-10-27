import React, { useState } from "react";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, addToCart, decreaseFromCart, removeFromCart, clearCart } = useCart();

  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();


  // form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
  });

  // handlers
  const handleIncrease = (item) => addToCart(item);
  const handleDecrease = (productId) => decreaseFromCart(productId);
  const handleRemove = (productId) => removeFromCart(productId);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.price || 0) * (item.count || 1),
    0
  );

  const openCheckout = () => {
    setShowModal(true);
    setSuccess(false);
    setSubmitting(false);
  };

  const closeModal = () => {
  setShowModal(false);
  setForm({ name: "", email: "", address: "" });
  setSubmitting(false);
  setSuccess(false);
  navigate("/"); // 👈 redirect to home
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    return form.name.trim() !== "" && form.email.trim() !== "" && form.address.trim() !== "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("Please fill out name, email and address.");
      return;
    }

    // Simulate submit process (UI only) — you can replace with real API call
    setSubmitting(true);

    // Immediately clear cart so user doesn't accidentally repurchase while waiting
    clearCart();

    // small artificial delay to show spinner & then success
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 600);
  };

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center text-gray-600 py-20">
            <p className="text-lg">Your cart is currently empty 🛒</p>
            <Link to="/">
              <span className="mt-4 inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
                Continue Shopping
              </span>
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
                onClick={openCheckout}
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-start justify-center z-50">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={closeModal}
          ></div>

          {/* modal panel */}
          <div className="relative bg-white rounded-xl shadow-lg p-6 mt-8 w-full max-w-lg transform animate-slideDown z-10">
            {/* Close X */}
            <button
              onClick={closeModal}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              ✕
            </button>

            {!success ? (
              <>
                <h2 className="text-2xl font-semibold text-center mb-4">
                  Checkout
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                      placeholder="Full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      type="email"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Shipping Address
                    </label>
                    <textarea
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                      rows="3"
                      placeholder="Street, city, postal code"
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      Total: <span className="font-semibold">${(subtotal + 5).toFixed(2)}</span>
                    </div>

                    <button
                      type="submit"
                      className="ml-3 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                      disabled={submitting}
                    >
                      {submitting ? "Placing order..." : "Place Order"}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              // success view
              <div className="py-6 text-center">
                <div className="text-4xl mb-3">✅</div>
                <h3 className="text-xl font-semibold mb-2">Order Placed!</h3>
                <p className="text-gray-600 mb-4">
                  Thank you — your order has been placed successfully.
                </p>
                <button
                  onClick={closeModal}
                  className="mt-2 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tailwind animation for slide-down */}
      <style>{`
        @keyframes slideDown {
          0% { transform: translateY(-100%); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-slideDown {
          animation: slideDown 0.35s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Cart;
