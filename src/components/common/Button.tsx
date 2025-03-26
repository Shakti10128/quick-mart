import { FC } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";

export type PathType = string | "/"

interface ButtonInterface {
  title: string;
  isFullWidth?: boolean;
  loading?: boolean;
  path?:PathType
}

const Button: FC<ButtonInterface> = ({ title, isFullWidth, loading,path}) => {
  return (
    <div className={`${isFullWidth ? "w-full" : "w-[10rem]"}`}>
      <Link to={`${path}`}>
        <button
          disabled={loading}  // Disable when loading
          className={`h-12 bg-black text-white rounded-full w-full flex items-center justify-center gap-2 
          ${loading ? "opacity-50 cursor-not-allowed" : "hover:cursor-pointer"}`}
        >
          {loading ? <FaSpinner className="animate-spin" /> : title}
        </button>
      </Link>
    </div>
  );
};

export default Button;
