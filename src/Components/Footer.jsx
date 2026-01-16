import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8 mt-20">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Column 1: Brand & App */}
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold font-heading text-red-500 mb-4">RedStore</h3>
                        <p className="text-gray-400 text-sm mb-4">Download our App for Android and iOS mobile phones.</p>
                        <div className="flex justify-center md:justify-start gap-4">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Play Store" className="h-10 cursor-pointer" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg" alt="App Store" className="h-10 cursor-pointer" />
                        </div>
                    </div>

                    {/* Column 2: Purpose */}
                    <div className="text-center md:text-left">
                        <h4 className="text-lg font-semibold mb-4 text-gray-200">Our Purpose</h4>
                        <p className="text-gray-400 text-sm">Our purpose is to sustainably make the pleasure and benefits of fashion accessible to the many.</p>
                    </div>

                    {/* Column 3: Useful Links */}
                    <div className="text-center md:text-left">
                        <h4 className="text-lg font-semibold mb-4 text-gray-200">Useful Links</h4>
                        <ul className="text-gray-400 text-sm space-y-2">
                            <li className="hover:text-red-500 cursor-pointer transition">Coupons</li>
                            <li className="hover:text-red-500 cursor-pointer transition">Blog Post</li>
                            <li className="hover:text-red-500 cursor-pointer transition">Return Policy</li>
                            <li className="hover:text-red-500 cursor-pointer transition">Join Affiliate</li>
                        </ul>
                    </div>

                    {/* Column 4: Follow Us */}
                    <div className="text-center md:text-left">
                        <h4 className="text-lg font-semibold mb-4 text-gray-200">Follow Us</h4>
                        <div className="flex justify-center md:justify-start gap-4 text-xl">
                            <FaFacebookF className="hover:text-red-500 cursor-pointer transition" />
                            <FaTwitter className="hover:text-red-500 cursor-pointer transition" />
                            <FaInstagram className="hover:text-red-500 cursor-pointer transition" />
                            <FaLinkedinIn className="hover:text-red-500 cursor-pointer transition" />
                        </div>
                    </div>
                </div>

                <hr className="border-gray-800" />
                <div className="text-center pt-8">
                    <p className="text-gray-500 text-sm">© 2026 RedStore. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
