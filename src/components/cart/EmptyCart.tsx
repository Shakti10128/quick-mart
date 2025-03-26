import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";

const EmptyCart = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
            {/* Shopping Cart Icon */}
            <AiOutlineShoppingCart className="text-gray-400 text-9xl mb-4" />

            {/* Message */}
            <h2 className="text-2xl font-bold text-gray-700">Your Cart is Empty</h2>
            <p className="text-gray-500 mt-2">Looks like you haven’t added anything to your cart yet.</p>

            {/* Button to Shop */}
            <Link to="/products" className="mt-6 px-6 py-3 bg-black text-white text-lg rounded-lg shadow-md hover:bg-blue-600 transition">
                Start Shopping
            </Link>
        </div>
    );
};

export default EmptyCart;
