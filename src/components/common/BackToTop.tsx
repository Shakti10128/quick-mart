import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const BackToTop = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setVisible(window.scrollY > 200); // Show button when scrolled 200px
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-16 right-6 p-3 bg-white text-black rounded-full shadow-lg transition-opacity ${
                visible ? "opacity-100" : "opacity-0"
            } hover:cursor-pointer`}
        >
            <FaArrowUp size={20} />
        </button>
    );
};

export default BackToTop;
