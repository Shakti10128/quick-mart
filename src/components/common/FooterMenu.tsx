import { AiOutlineHome, AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { LuShoppingBag } from "react-icons/lu";
import { BiSupport } from "react-icons/bi";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

type FooterMenuServices = "home" | "shopping" | "cart" | "profile" | "support"

const FooterMenu = () => {
    const [active, setActive] = useState<FooterMenuServices>("home");
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes("/products")) {
            setActive("shopping");
        } 
        else if(location.pathname.includes("/profile")) {
            setActive("profile")
        }
        else if(location.pathname.includes("/cart")) {
            setActive("cart")
        }
        else if(location.pathname.includes("/support")) {
            setActive("support")
        }
        else{
            setActive("home")
        }
    }, [location.pathname]); // Runs only when route changes

    return (
        <div className="block lg:hidden h-20">
            <div className="fixed bottom-0 left-0 w-full bg-white shadow-md p-4 flex justify-around items-center lg:hidden">
                <Link to={"/"}>
                    <AiOutlineHome className={`text-gray-700 w-6 h-6 ${active === "home" && "text-red-600"} hover:cursor-pointer`}
                        onClick={() => setActive("home")} />
                </Link>

                <Link to={"/products"}>
                <LuShoppingBag className={`text-gray-700 w-6 h-6 ${active === "shopping" && "text-red-600"} hover:cursor-pointer`}
                    onClick={() => setActive("shopping")} />
                </Link>

                <Link to={"/cart"}>
                <AiOutlineShoppingCart className={`text-gray-700 w-6 h-6 ${active === "cart" && "text-red-600"} hover:cursor-pointer`}
                    onClick={() => setActive("cart")} />
                </Link>

                <Link to={"/profile"}>
                <AiOutlineUser className={`text-gray-700 w-6 h-6 ${active === "profile" && "text-red-600"} hover:cursor-pointer`}
                    onClick={() => setActive("profile")} />
                </Link>

                <Link to={"/support"}>
                <BiSupport className={`text-gray-700 w-6 h-6 ${active === "support" && "text-red-600"} hover:cursor-pointer`}
                    onClick={() => setActive("support")} />
                </Link>
            </div>
        </div>
    );
}

export default FooterMenu