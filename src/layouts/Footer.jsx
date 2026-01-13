import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Branding & About */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-black tracking-tighter text-gray-800">
              Salon<span className="text-primary">Hub</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Your one-stop platform to discover, book, and manage salon services with ease. Elevating your grooming experience.
            </p>
            <div className="flex gap-3">
              <a href="#" className="btn btn-ghost btn-circle btn-sm hover:bg-primary hover:text-white transition-all">
                <FaFacebookF />
              </a>
              <a href="#" className="btn btn-ghost btn-circle btn-sm hover:bg-primary hover:text-white transition-all">
                <FaTwitter />
              </a>
              <a href="#" className="btn btn-ghost btn-circle btn-sm hover:bg-primary hover:text-white transition-all">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bold text-gray-800 uppercase text-xs tracking-widest mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/salons" className="text-sm text-gray-500 hover:text-primary transition-colors">
                  Find Salons
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-gray-500 hover:text-primary transition-colors">
                  Explore Services
                </Link>
              </li>
              <li>
                <Link to="/memberships" className="text-sm text-gray-500 hover:text-primary transition-colors">
                  Memberships
                </Link>
              </li>
              <li>
                <Link to="/loyalty" className="text-sm text-gray-500 hover:text-primary transition-colors">
                  Loyalty Points
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h4 className="font-bold text-gray-800 uppercase text-xs tracking-widest mb-6">Support</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/contact" className="text-sm text-gray-500 hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-gray-500 hover:text-primary transition-colors">
                  Help Center / FAQ
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-500 hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-gray-500 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter/CTA */}
          <div>
            <h4 className="font-bold text-gray-800 uppercase text-xs tracking-widest mb-6">Stay Updated</h4>
            <p className="text-sm text-gray-500 mb-4">Subscribe to get salon deals and beauty tips.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email address" className="input input-bordered input-sm w-full focus:outline-primary" />
              <button className="btn btn-primary btn-sm">Join</button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">© {currentYear} SalonHub Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="text-xs text-gray-400 hover:text-gray-600 cursor-pointer">English (US)</span>
            <span className="text-xs text-gray-400 hover:text-gray-600 cursor-pointer">USD ($)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
