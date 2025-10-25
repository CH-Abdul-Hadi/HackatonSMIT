import React, { useEffect, useRef, useState } from "react";
import { TiShoppingCart, TiUser, TiLocationArrow } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useWindowScroll } from "react-use";
import gsap from "gsap";
import { useCart } from "../context/CartContext";

function Navbar() {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const navContainerRef = useRef(null);
  const { y: currentScrollY } = useWindowScroll();

  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((acc, item) => acc + item.count, 0);

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }
    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.3,
      ease: "power2.out",
    });
  }, [isNavVisible]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-2 z-50 h-16 border-none transition-all duration-700 sm:inset-x-4 md:inset-x-6 sm:top-4"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex items-center justify-between px-3 py-2 bg-white/80 backdrop-blur-lg rounded-xl shadow-lg sm:px-4 md:px-6 sm:rounded-2xl">
          {/* Left Section - Shop Now Button */}
          <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
            <a
              onClick={() => {
                const section = document.getElementById("products-section");
                if (section) {
                  section.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="flex items-center gap-1 px-2 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition text-xs sm:text-sm sm:px-3 sm:py-2 cursor-pointer"
            >
              <span className="hidden sm:inline">Shop Now</span>
              <span className="sm:hidden">Shop</span>
              <TiLocationArrow className="text-sm sm:text-base" />
            </a>
          </div>

          {/* Center Section - Logo */}
          <div className="flex items-center absolute left-1/2 -translate-x-1/2">
            <Link to="/">
              <img 
                src="/logo.png" 
                alt="logo" 
                className="h-12 object-contain sm:h-16 md:h-20 lg:h-22" 
              />
            </Link>
          </div>

          {/* Right Section - Cart & User */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
            <button className="relative">
              <Link to="/cart">
                <TiShoppingCart
                  size={22}
                  className="text-gray-700 hover:text-blue-600 transition sm:w-6 sm:h-6"
                />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white text-[10px] rounded-full px-1 min-w-[18px] h-[18px] flex items-center justify-center sm:text-xs sm:-top-2 sm:-right-2 sm:min-w-[20px] sm:h-[20px]">
                    {cartCount}
                  </span>
                )}
              </Link>
            </button>
            <button>
              <TiUser
                size={22}
                className="text-gray-700 hover:text-blue-600 transition sm:w-6 sm:h-6"
              />
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;