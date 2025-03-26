import smoothScrollToTop from "@/utils/smoothScrollToTop";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        smoothScrollToTop();
    },[])

    return (
        <div className="flex h-[80vh] items-center justify-center bg-gray-100 text-black">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full text-center">
                {/* Heading */}
                <h1 className="text-3xl font-bold mb-4">
                    Welcome to <span className="text-black">QuickMart</span>
                </h1>
                <p className="text-gray-600 text-lg">
                    Your one-stop destination for quality shopping 🛒
                </p>

                {/* About Description */}
                <div className="mt-6 text-gray-700">
                    <p className="mb-4">
                        At QuickMart, we make online shopping{" "}
                        <strong>fast, simple, and affordable</strong>. Our mission is to provide customers with the{" "}
                        <strong>best products</strong> at unbeatable prices.
                    </p>
                    <p>
                        We believe in <strong>trust, innovation, and quality</strong>, ensuring a seamless shopping experience for all.
                    </p>
                </div>

                {/* Our Values */}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-2">Why Choose Us?</h2>
                    <ul className="text-gray-700">
                        <li>✔ Premium Quality Products</li>
                        <li>✔ Fast & Secure Delivery</li>
                        <li>✔ 24/7 Customer Support</li>
                        <li>✔ Easy & Secure Payments</li>
                    </ul>
                </div>

                {/* Call to Action */}
                <div className="mt-8">
                    <button
                        className="bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-800 transition"
                        onClick={() => navigate("/products")}
                    >
                        Start Shopping Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
