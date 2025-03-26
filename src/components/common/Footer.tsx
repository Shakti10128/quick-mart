import smoothScrollToTop from "@/utils/smoothScrollToTop";
import { useEffect } from "react";
import {FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    useEffect(()=>{
        smoothScrollToTop();
    },[])
    return (
        <footer className="md:mt-20 mt-10 bg-black text-white py-10 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                {/* Company Info */}
                <div>
                    <h2 className="text-2xl font-bold">QuickMart</h2>
                    <p className="text-gray-400 mt-2">
                        Your one-stop shop for quality products at the best prices.
                    </p>
                </div>

                {/* Useful Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-gray-400">
                        <Link to={"/"}>
                            <li className="hover:text-white">Home</li>
                        </Link>
                        <Link to={"/products"}>
                            <li className="hover:text-white">Shop</li>
                        </Link>
                        <Link to={"/about-us"}>
                            <li className="hover:text-white">About Us</li>
                        </Link>
                        <Link to={"/support"}>
                            <li className="hover:text-white">Contact Us</li>
                        </Link>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
                    <div className="flex justify-center md:justify-start gap-4 text-gray-400">
                        <a href="https://x.com/shakti10128?t=q8cpiBT6bRlpGUAkUqXzig&s=09" className="hover:text-white"><FaTwitter size={20} /></a>

                        <a href="https://www.instagram.com/shakti_aashu/?hl=en" className="hover:text-white"><FaInstagram size={20} /></a>

                        <a href="https://www.linkedin.com/in/shakti-kumar-786449190?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="hover:text-white"><FaLinkedinIn size={20} /></a>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="text-center text-gray-500 text-sm mt-6 border-t border-gray-700 pt-4">
                &copy; {new Date().getFullYear()} QuickMart. All rights reserved.
                <p className="mt-2 text-gray-400">Developed by <span className="text-white font-semibold">Shakti Kumar</span></p>
            </div>
        </footer>
    );
};

export default Footer;
