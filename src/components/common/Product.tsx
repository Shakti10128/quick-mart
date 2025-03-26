import { ProductInterface } from "@/pages/Products";
import { addToCart, removeFromCart } from "@/Slices/cartSlice";
import { selectUserState } from "@/Slices/userSlice";
import { FC, useState } from "react"
import { FaCartPlus } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface TempProductInterface{
    id?:number
    name:string
    quantity:number
    price:number
    description?:string
    productUrl:string
    category?:string
    loading?:boolean
    btnType: "add to cart" | "buy now"
}


// Shimmer Loader Component
const LoadingSkeleton = () => {
    return (
      <div className="flex flex-col w-[40%] md:w-60 gap-1 animate-pulse">
        <div className="h-36 md:h-60 w-full bg-gray-300 rounded-md" />
        <div className="h-4 w-3/4 bg-gray-300 rounded-md mt-2" />
        <div className="h-4 w-1/2 bg-gray-300 rounded-md mt-1" />
        <div className="flex justify-between gap-4">
          <div className="h-4 w-1/3 bg-gray-300 rounded-md" />
          <div className="h-6 w-6 bg-gray-300 rounded-full" />
        </div>
      </div>
    );
  };

const Product:FC<TempProductInterface> = ({id,name,quantity,price,productUrl,loading,btnType,category,description}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector(selectUserState).token;

  const addToCartHandler = ()=>{
    const product : ProductInterface = {
      id,name,quantity,price,description,productUrl,loading,category,
    }
    dispatch(addToCart(product));
  }

  const productBuyHandler = ()=>{
    if(token === null) {
      navigate("/auth")
    }
    else{
      navigate("/cart/order")
    }
  }

  const removeProductFromCartHandler = ()=>{
    dispatch(removeFromCart(id))
  }

  if (loading) return <LoadingSkeleton />;

  return (
        <div className="flex flex-col w-[40%] md:w-60">
              <img 
              onClick={()=>navigate(`/products/productDetails/${id}`)}
                src={productUrl} 
                alt="product-url"
                className={`md:h-60 md:w-60 md:object-top  h-[90%] w-full object-cover rounded-md hover:cursor-pointer hover:scale-105 transition-all ${isLoaded ? "blur-0" : "blur-sm"}`}
                loading="lazy"
                onLoad={() => setIsLoaded(true)}
              />
                <h3 className="font-semibold flex truncate text-[14px] md:text-[18px]">{name + "..."}</h3>
                <p className="font-semibold text-[14px] md:text-[18px]">
                    <span className={`${quantity > 0 ? "text-green-600" : "text-red-600"}`}>
                        {quantity > 0 ? "In-stock: " : "Out-of-stock "}
                    </span>
                    <span>{quantity > 0 && quantity}</span>
                </p>
                <div className="flex justify-between gap-4 font-semibold sm:text-[14px] md:text-[18px]">
                    <p>{"\u20B9" + price}</p>
                    {
                      btnType === "add to cart" ?
                        <FaCartPlus className="h-5 w-5  md:mt-0 hover:cursor-pointer hover:text-gray-700 hover:scale-105 transition-all"
                        onClick={addToCartHandler}/>
                    : 
                      <div className="flex gap-2">
                        <MdOutlineShoppingBag className="h-5 w-5  md:mt-0 hover:cursor-pointer hover:text-gray-700 hover:scale-105 transition-all"
                        onClick={productBuyHandler}
                        />
                        <MdOutlineRemoveShoppingCart className="h-5 w-5 md:mt-0 hover:cursor-pointer hover:text-gray-700 hover:scale-105 transition-all"
                        onClick={removeProductFromCartHandler}
                        />
                      </div>
                    }
                </div>
            </div>
  )
}

export default Product