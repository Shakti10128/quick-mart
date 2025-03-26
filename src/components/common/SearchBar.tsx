
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.length > 0) {
        setInputValue("");
        navigate(`/products/${inputValue}`)
    }
    else if(event.key === "Enter" && inputValue.length === 0){
      navigate(`/products`)
    }
};

  return (
    <div className={`md:ml-10 h-fit md:h-12 w-[60%] md:w-[35%]`}>
        <div className='h-10 md:ml-0 flex items-center md:h-12 w-full rounded-full bg-gray-100 gap-2 pl-2'>
            <FiSearch className='h-5 w-5 text-gray-400'/>
             <input placeholder='Search for product...' className="w-full rounded-full h-full border-none outline-none"
             value={inputValue}
             onChange={(e) => setInputValue(e.target.value)}
             onKeyDown={handleKeyDown} // Detect Enter key press
             />
        </div>
    </div>
  )
}

export default SearchBar