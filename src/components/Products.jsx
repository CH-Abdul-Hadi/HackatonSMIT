import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Card from "./Card";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Products = () => {
  const [products, setProducts] = useState([]);
  const containerRef = useRef(null); // 👈 container for ScrollTrigger animations

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      // wait a moment for all cards to mount
      setTimeout(() => {
        const cards = gsap.utils.toArray(".product-card");

        gsap.fromTo(
          cards,
          { opacity: 0, y: 80, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%", // start animating when section enters view
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }, 300);
    }
  }, [products]);

  return (
    <section
      ref={containerRef}
      id="products-section"
      className="py-6 px-4 sm:py-8 mt-30 flex justify-center sm:px-6 lg:py-10 lg:px-8 bg-gray-50 dark:bg-gray-900 min-h-screen"
    >
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8 text-gray-800 dark:text-white">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <Card
                productId={product.id}
                imageSrc1={product.image}
                imageSrc2={product.image}
                status="Hot"
                productTitle={product.title}
                Description={product.category}
                price={product.price}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
