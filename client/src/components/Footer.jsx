import React, { useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import {
  BsShieldLockFill,
  BsTelephoneFill,
  BsFillEnvelopeFill,
  BsLightningFill,
} from "react-icons/bs";

import VisaLogo from "../assets/Visa_Logo.png";
import MasterCardLogo from "../assets/Mastercard-logo.svg";
import RazorpayLogo from "../assets/Razorpay_logo.svg";

const Footer = () => {
  const [email, setEmail] = useState("");

  // Handle Newsletter Subscription
  const handleSubscribe = () => {
    if (!email) {
      alert("Please enter your email!");
      return;
    }
    console.log("Subscribing:", email);
    alert("Subscribed successfully!");
    setEmail("");
  };

  // Open Live Chat (Example: redirecting to a chat page)
  const handleLiveChat = () => {
    window.location.href = "/live-chat"; // Replace with actual chat URL
  };

  return (
    <footer className="border-t bg-gray-100 text-gray-700 text-sm">
      <div className="container mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
        {/* Company Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Binkeyit Pvt Ltd</h3>
          <p className="flex items-center gap-2 text-green-600 font-semibold">
            <BsLightningFill className="text-xl" /> Super-Fast Delivery in 10 Minutes!
          </p>
          <p>Bangalore, India</p>
          <p>
            <BsFillEnvelopeFill className="inline mr-2" />
            <a href="mailto:support@binkeyit.com" className="text-green-600 hover:underline">
              support@binkeyit.com
            </a>
          </p>
          <p>
            <BsTelephoneFill className="inline mr-2" />
            <a href="tel:+919876543210" className="text-green-600 hover:underline">
              +91 98765 43210
            </a>
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
          <a href="/about" className="block hover:underline">About Us</a>
          <a href="/privacy-policy" className="block hover:underline">Privacy Policy</a>
          <a href="/terms" className="block hover:underline">Terms & Conditions</a>
          <a href="/faq" className="block hover:underline">FAQs</a>
        </div>

        {/* Customer Support */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">Customer Support</h3>
          <a href="/contact" className="block hover:underline">Contact Us</a>
          <a href="/returns" className="block hover:underline">Return & Refund Policy</a>
          <a href="/shipping" className="block hover:underline">Shipping & Delivery</a>
          <p className="text-sm text-gray-600 mt-3">Need urgent help?</p>
          <button
            onClick={handleLiveChat}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition w-full sm:w-auto"
          >
            Live Chat
          </button>
        </div>

        {/* Newsletter Subscription */}
        <div className="flex flex-col space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">Subscribe to Our Newsletter</h3>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="border p-2 rounded-md w-full"
          />
          <button
            onClick={handleSubscribe}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition w-full sm:w-auto"
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* Social Media & Payment Methods */}
      <div className="container mx-auto px-4 sm:px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Social Media Links */}
        <div className="flex gap-6 sm:gap-8 text-2xl sm:text-3xl">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition">
            <FaFacebook />
          </a>
          <a href="https://www.instagram.com/manoj__2207?igsh=MTJmYjNtaHM3cG5sMw==" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700 transition">
            <FaInstagram />
          </a>
          <a href="https://www.linkedin.com/in/manojm2207" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 transition">
            <FaLinkedin />
          </a>
        </div>

        {/* Secure Payment Badge */}
        <div className="flex flex-col items-center text-center space-y-1">
          <BsShieldLockFill className="text-2xl text-gray-600" />
          <p className="text-xs font-semibold text-gray-800">Secure Payments</p>
          <p className="text-xs text-gray-500">PCI DSS Compliant</p>
          <p className="text-sm font-semibold text-gray-800 mt-2">Trusted by 100,000+ Customers</p>
        </div>

        {/* Payment Methods */}
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-10">
          <img src={VisaLogo} alt="Visa" className="h-8 sm:h-10 md:h-12 w-auto max-w-[80px] sm:max-w-[100px]" />
          <img src={MasterCardLogo} alt="MasterCard" className="h-8 sm:h-10 md:h-12 w-auto max-w-[80px] sm:max-w-[100px]" />
          <img src={RazorpayLogo} alt="Razorpay" className="h-6 sm:h-8 md:h-10 w-auto max-w-[80px] sm:max-w-[100px]" />
        </div>
      </div>

      {/* Copyright & Back to Top */}
      <div className="text-center text-xs text-gray-500 border-t py-4">
        <p>© {new Date().getFullYear()} Binkeyit. All rights reserved.</p>
        <p className="text-xs">
          This site is protected by reCAPTCHA and the Google Privacy Policy & Terms apply.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-green-600 hover:text-green-800 transition mt-2"
        >
          ↑ Back to Top
        </button>
      </div>
    </footer>
  );
};

export default Footer;
