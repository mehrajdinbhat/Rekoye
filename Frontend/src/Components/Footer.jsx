import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-sky-800 text-white pt-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8 grid md:grid-cols-4 gap-10">
        {/* Company Info */}
        <div>
          <h3 className="text-xl font-bold mb-4">Rekoye Pharmaceuticals</h3>
          <p className="text-gray-200 text-sm">
            Rekyoe Pharmaceuticals was incepted by Riyaz Ahmad Wani in 2000 with core values of integrity, passion for excellence, participative decision-making, concern for society & environment, fairness with care and transparency with a very meager capital and 10 employees.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-emerald-400">Home</a></li>
            <li><a href="/about" className="hover:text-emerald-400">About</a></li>
            <li><a href="/products" className="hover:text-emerald-400">Our Products</a></li>
            <li><a href="/career" className="hover:text-emerald-400">Career</a></li>
            <li><a href="/contact" className="hover:text-emerald-400">Contact Us</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <p className="text-gray-200 mb-2">Rekoye Pharmaceuticals Pvt Ltd 
Room No. 5 First Floor anjuman awqaf building Adalat masjid Srinagar Jammu and Kashmir India</p>
          <p className="text-gray-200 mb-2">info@Rekoye.com</p>
          <div className="flex space-x-4 mt-4">
            <a href="#"><FaFacebookF className="hover:text-emerald-400" /></a>
            <a href="#"><FaTwitter className="hover:text-emerald-400" /></a>
            <a href="#"><FaInstagram className="hover:text-emerald-400" /></a>
            <a href="#"><FaLinkedinIn className="hover:text-emerald-400" /></a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="">
          <h3 className="text-xl font-bold mb-4">Contact Now</h3>
          <form className="space-y-3">
            <input
              type="text"
              placeholder="Name"
              className="w-full px-3 py-2 rounded-md text-black focus:outline-none bg-white"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 rounded-md text-black focus:outline-none bg-white"
            />
            <input
              type="text"
              placeholder="Phone"
              className="w-full px-3 py-2 rounded-md text-black focus:outline-none bg-white"
            />
            <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-md transition-colors duration-300">
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-sky-700 mt-10 py-6 text-center text-gray-300 text-sm">
        © 2018 Pharmace. All rights reserved | Design by Mehraj Din Bhat
      </div>
    </footer>
  );
}
