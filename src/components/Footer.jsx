import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-16 relative top-17">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">

        {/* Logo & Description */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src="/logo.png" alt="Logo"  />
            {/* <h2 className="text-xl font-bold text-white">Nexus Store</h2> */}
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Your one-stop shop for fashion, accessories, and lifestyle products.  
            Discover new trends and timeless essentials.
          </p>
        </div>

      
        

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Customer Service</h3>
         
        </div>

        {/* Contact & Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Get In Touch</h3>
          <p className="text-sm text-gray-400">Email: support@nexusstore.com</p>
          <p className="text-sm text-gray-400 mb-4">Phone: +92 300 1234567</p>
          
        </div>
      </div>

      {/* Divider */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Drip Zone. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
