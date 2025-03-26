import { Search } from "lucide-react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface NoResultInterface{
  title:string
}

const NoResults:FC<NoResultInterface> = ({title}) => {

    const navigate = useNavigate();

  return (
    <div className="flex h-[80vh] items-center justify-center">
      <div className="w-4/5 max-w-lg text-center bg-gray-100 p-6 rounded-lg shadow-md">
        <Search size={48} className="mx-auto text-gray-500" />
        <h2 className="text-2xl font-bold mt-4">No Results Found For {title}</h2>
        <p className="text-gray-600 mt-2">We couldn't find any matches for your search.</p>
        <button 
          onClick={() => navigate("/products")}
          className="mt-4 px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800"
        >
          Browse Products
        </button>
      </div>
    </div>
  );
};

export default NoResults;
