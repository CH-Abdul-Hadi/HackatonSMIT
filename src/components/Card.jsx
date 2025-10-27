import React, { useState } from "react";
import { Star } from "lucide-react";
import { TiShoppingCart } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Card = ({
  productId,
  imageSrc1,
  imageSrc2,
  status,
  productTitle,
  Description,
  price,
}) => {
  const [hover, setHover] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const imageSrc = hover ? imageSrc1 : imageSrc2;

  const handleAddToCart = () => {
    addToCart({
      productId,
      imageSrc1,
      imageSrc2,
      productTitle,
      Description,
      price,
    });
  };

  const handleImageClick = () => {
    navigate(`/product/${productId}`);
  };

  return (
    <div
      className="relative w-full max-w-[234px] h-[346px] bg-white rounded-2xl shadow-md overflow-hidden 
        transition-all duration-300 hover:shadow-xl cursor-pointer mx-auto
        sm:max-w-[280px] sm:h-[380px] md:max-w-[234px] md:h-[346px]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full z-10">
        {status || "New Arrival"}
      </div>
      <div
        className="flex justify-center items-center mt-8 cursor-pointer px-4"
        onClick={handleImageClick}
      >
        <img
          src={imageSrc}
          alt={productTitle}
          className="w-[150px] h-[150px] object-contain rounded-lg hover:scale-105 transition-transform
            sm:w-[180px] sm:h-[180px] md:w-[150px] md:h-[150px]"
        />
      </div>
      <div className="flex justify-center items-center mt-3 space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={18} fill="#facc15" stroke="#facc15" />
        ))}
      </div>
      <div className="mt-3 text-center px-4">
        <h3 className="text-gray-800 font-semibold text-base leading-tight line-clamp-1">
          {productTitle}
        </h3>
        <p className="text-gray-500 text-sm mt-1 line-clamp-2">{Description}</p>
      </div>
      <div className="mt-4 flex justify-around border-none grid-cols-2 text-center">
        <div className="text-lg font-bold text-gray-800">${price}</div>
        <button onClick={handleAddToCart}>
          <TiShoppingCart
            size={25}
            className="text-gray-700 hover:text-blue-600 transition"
          />
        </button>
      </div>
    </div>
  );
};

export default Card;
