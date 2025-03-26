import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector} from "react-redux";
import { AppDispatch } from "@/Store/Store";
import { selectUserState, setToken, setUser } from "@/Slices/userSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSpinner} from "react-icons/fa";
import { backendUrl } from "@/utils/staticDataAndVariable";

type AuthType = "Signup" | "Login";

const Auth = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [authMode, setAuthMode] = useState<AuthType>("Signup");
    const [loading, setLoading] = useState<boolean>(false);

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const location = useLocation();
    const token = useSelector(selectUserState).token;

    useEffect(() => {
        if (token !== null) {
            // Redirect to previous path or home page if none
            const redirectPath = location.state?.from || "/";
            navigate(redirectPath);
        }
    });

    const authHandler = async () => {
        setLoading(true);
    
        try {
            if (!email || !password || (authMode === "Signup" && !name)) {
                toast("All fields are required!");
                return;
            }
    
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(email)) {
                toast("Invalid email format");
                return;
            }
    
    
            const endpoint = authMode === "Signup" ? "signup" : "login";
            const payload =
                authMode === "Signup"
                    ? {name,email,password,role: "USER",}
                    : { email, password ,role: "USER"};
    
            const result = await axios.post(`${backendUrl}/users/${endpoint}`, payload, {
                withCredentials: true,
            });
    
            // console.log(result.data) // debug step
            dispatch(setUser(result.data.data));
            dispatch(setToken(result.data.token));
            toast(`${authMode} successful!`);
            navigate(location.state?.from || "/", { replace: true });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast(error.response?.data?.errorMessage || "Authentication failed.");
            } else {
                toast("Something went wrong, please try again.");
            }
            console.error("Auth Error:", error);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="flex items-center justify-center h-fit">
            <div className="flex flex-col rounded-md w-full h-full lg:w-[40%] bg-gray-50 gap-2 lg:gap-5 lg:m-10 lg:p-10 p-2 my-12">
                
                {/* Title */}
                <div className="flex flex-col items-center justify-center gap-5">
                    <h1 className="text-xl font-extrabold lg:text-3xl">
                        Welcome to QuickMart
                    </h1>
                    <h3 className="font-bold lg:text-xl">
                        Please {authMode} {authMode === "Login" ? "🔑" : "🔐"}
                    </h3>
                </div>

                {/* Input Fields */}
                {authMode === "Signup" && (
                    <input 
                        type="text" 
                        required 
                        placeholder="Enter your name" 
                        name="name"
                        className="p-2 border rounded-md my-2 py-4"
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                    />
                )}
                <input 
                    type="email" 
                    required 
                    placeholder="Enter your email" 
                    name="email"
                    className="p-2 border rounded-md my-2 py-4"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type="password" 
                    required 
                    placeholder="Enter your password" 
                    name="password"
                    className="p-2 border rounded-md my-2 py-4"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                />

                {/* Auth Button */}
                <button
                    disabled={loading}
                    onClick={authHandler}
                    className={`h-12 bg-black text-white rounded-full w-full flex items-center justify-center gap-2 
                    ${loading ? "opacity-50 cursor-not-allowed" : "hover:cursor-pointer"}`}
                >
                    {loading ? <FaSpinner className="animate-spin" /> : authMode}
                </button>

                {/* Toggle Login/Signup */}
                <div className="flex gap-4 my-3">
                    <p className={`${authMode === "Login" ? "text-red-600" : "text-green-600"}`}>
                        {authMode === "Login" ? "Don't have an account? " : "Already have an account? "}
                    </p>
                    <span 
                        className="underline underline-offset-2 hover:cursor-pointer"
                        onClick={() => setAuthMode(authMode === "Login" ? "Signup" : "Login")}
                    >
                        {authMode === "Login" ? "Signup" : "Login"}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Auth;
