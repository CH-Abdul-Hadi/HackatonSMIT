import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <section className="py-6 px-4 sm:py-8 mt-30 flex justify-center  sm:px-6 lg:py-10 lg:px-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8 text-gray-800 dark:text-white">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {products.map((product) => (
            <Card
              key={product.id}
              productId={product.id}
              imageSrc1={product.image}
              imageSrc2={product.image}
              status="Hot"
              productTitle={product.title}
              Description={product.category}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;