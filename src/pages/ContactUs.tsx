import smoothScrollToTop from "@/utils/smoothScrollToTop";
import React, { useEffect, useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const ContactUs = () => {
    useEffect(() => {
        smoothScrollToTop();
    }, []);

    // State for form fields
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const messageHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!formData.name || !formData.email || !formData.message) {
            toast.error("Please fill out all fields!");
            return;
        }

        toast.success("Message sent to the team");

        // Clear form after submission
        setFormData({
            name: "",
            email: "",
            message: "",
        });
    };

    return (
        <div className="flex flex-col items-center justify-center my-8 h-fit bg-white text-black px-6">
            {/* Heading */}
            <h2 className="text-4xl font-extrabold mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-6">We’d love to hear from you!</p>

            {/* Contact Icons */}
            <div className="flex flex-col md:flex-row gap-6 mb-6 text-gray-800">
                <div className="flex items-center gap-2">
                    <FaPhoneAlt className="text-black" />
                    <span>+123 456 7890</span>
                </div>
                <div className="flex items-center gap-2">
                    <FaEnvelope className="text-black" />
                    <span>support@QuickMart.com</span>
                </div>
                <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-black" />
                    <span>New Delhi, India</span>
                </div>
            </div>

            {/* Contact Form */}
            <form className="w-full max-w-md bg-gray-100 p-6 rounded-lg shadow-lg" onSubmit={messageHandler}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-1">Message</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Enter your message"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition duration-300"
                >
                    Send Message
                </button>
            </form>
        </div>
    );
};

export default ContactUs;