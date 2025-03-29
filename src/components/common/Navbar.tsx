import { useState, useEffect } from "react";
import SearchBar from "../common/SearchBar";
import { BsCartPlus } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "@/Slices/cartSlice";
import { logout } from "@/api/userApis";
import { AppDispatch } from "@/Store/Store";
import { selectUserState } from "@/Slices/userSlice";

const Navbar = () => {
    const [active, setActive] = useState<string>("");
    const [isSticky, setIsSticky] = useState<boolean>(false);

    const token = useSelector(selectUserState).token;

    const cart = useSelector(selectCart);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const logoutHandler = async()=>{
        logout({navigate,dispatch});
    }


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={`transition-all duration-300 ${isSticky ? "fixed top-0 left-0 w-full z-50 bg-white shadow-md" : ""}`}>
            <div className="h-18 md:h-20 text-black flex items-center justify-around md:justify-center">
                {/* logo */}
                <div className="hover:cursor-pointer">
                    <Link to={"/"}>
                        <h1 className="hidden md:block text-black text-2xl md:text-4xl font-extrabold"
                            onClick={() => setActive("")}>
                            QuickMart
                        </h1>
                        <h1 className="md:hidden text-black text-2xl md:text-4xl font-extrabold"
                            onClick={() => setActive("")}>
                            QM
                        </h1>
                    </Link>
                </div>

                {/* service list */}
                <div className="hidden lg:flex md:ml-10">
                    <ul className="flex mt-3 gap-7 font-semibold text-lg text-gray-800">
                        <Link to={"/products"}>
                            <li className={`hover:cursor-pointer ${active === "Shop" ? "text-red-500 underline decoration-red-500" : "hover:text-gray-500"}`} onClick={() => setActive("Shop")}>Shop</li>
                        </Link>
                        <Link to={"/products"}>
                            <li className={`hover:cursor-pointer ${active === "On Sale" ? "text-red-500 underline decoration-red-500" : "hover:text-gray-500"}`} onClick={() => setActive("On Sale")}>On Sale</li>
                        </Link>
                        <Link to={"/products"}>
                        <li className={`hover:cursor-pointer ${active === "Brands" ? "text-red-500 underline decoration-red-500" : "hover:text-gray-500"}`} onClick={() => setActive("Brands")}>Brands</li>
                        </Link>
                        <Link to={"/support"}>
                        <li className={`hover:cursor-pointer ${active === "Contact Us" ? "text-red-500 underline decoration-red-500" : "hover:text-gray-500"}`} onClick={() => setActive("Contact Us")}>Contact Us</li>
                        </Link>
                    </ul>
                </div>

                {/* search bar */}
                <SearchBar />
                {
                    token &&
                    <Link to={"/cart"}>
                        <AiOutlineLogout className="h-7 w-7 hover:cursor-pointer md:hidden"
                        onClick={logoutHandler}/>
                    </Link>
                }
                {/* user profile and cart */}
                <div className="hidden md:flex ml-10">
                    <div className="flex gap-7">
                        <Link to={"/cart"}>
                            <BsCartPlus className="h-7 w-7 hover:cursor-pointer" />
                        </Link>

                        {cart.cartItems.length > 0 && (
                            <span className="-ml-12 -mt-4  text-green-500 font-semibold" >
                                {cart.cartItems.length}
                            </span>
                        )}

                        <Link to={"/profile"}>
                            <FaRegUserCircle className="h-7 w-7 hover:cursor-pointer" />
                        </Link>
                        {
                            token &&
                            <Link to={"/cart"}>
                                <AiOutlineLogout className="h-7 w-7 hover:cursor-pointer"
                                onClick={logoutHandler}/>
                            </Link>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
