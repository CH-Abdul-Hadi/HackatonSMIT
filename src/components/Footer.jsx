import React, { useEffect } from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  useEffect(() => {
   
    gsap.fromTo(
      ".footer-container",
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".footer-container",
          start: "top 90%", // when footer is about to appear
          toggleActions: "play none none reverse",
        },
      }
    );

  
    gsap.fromTo(
      ".footer-item",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".footer-container",
          start: "top 85%",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 relative top-10 footer-container">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">

       
        <div className="footer-item">
          <div className="flex items-center gap-3 mb-4">
            <img src="/logo.png" alt="Logo" className=" h-14 object-contain" />
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Your one-stop shop for fashion, accessories, and lifestyle products.  
            Discover new trends and timeless essentials.
          </p>
        </div>

        <div className="footer-item">
          <h3 className="text-lg font-semibold text-white mb-3">Customer Service</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Contact Us</li>
            <li>Shipping & Returns</li>
            <li>Privacy Policy</li>
            <li>FAQs</li>
          </ul>
        </div>

        <div className="footer-item">
          <h3 className="text-lg font-semibold text-white mb-3">Get In Touch</h3>
          <p className="text-sm text-gray-400">Email: support@nexusstore.com</p>
          <p className="text-sm text-gray-400 mb-4">Phone: +92 300 1234567</p>

          <div className="flex space-x-4 text-gray-400 mt-3">
            <FaFacebookF className="hover:text-blue-500 cursor-pointer transition-all" />
            <FaInstagram className="hover:text-pink-500 cursor-pointer transition-all" />
            <FaTwitter className="hover:text-sky-400 cursor-pointer transition-all" />
            <FaLinkedinIn className="hover:text-blue-400 cursor-pointer transition-all" />
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Drip Zone. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
