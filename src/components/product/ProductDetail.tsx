import { FC, useEffect, useState } from "react";
import ShimmerForPruductDtail from "./ShimmerForProductDetail";
import { ProductInterface } from "@/pages/Products";
import { useDispatch } from "react-redux";
import { addToCart } from "@/Slices/cartSlice";
import { addRecentProduct } from "@/Slices/productsSlice";

interface ProductDetailInterface{
    product: ProductInterface,
    loading:boolean
}

const ProductDetail:FC<ProductDetailInterface> = ({product,loading}) => {
    const [isLoaded, setIsLoaded] = useState(false);
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedSize, setSelectedSize] = useState("M");
  

  const dispatch = useDispatch();

  const colors = ["black", "green", "blue"];
  const sizes = ["S", "M", "L", "XL"];

  
  const addToCartHandler = ()=>{
    dispatch(addToCart(product));
  }
  
  useEffect(() => {
    dispatch(addRecentProduct(product));
  }, [])
  
  if (loading) {
    return <ShimmerForPruductDtail />;
  }
  
  return (
    <div className="w-full md:h-[90vh] md:mt-10 h-full mx-auto p-4 md:flex md:gap-20">
      {/* Product Image */}
      <div className="md:w-1/2">
        <img
            src={product.productUrl}
            alt={product.name}
            className={`h-[60vh] md:ml-56 mx-auto rounded-md hover:cursor-pointer transition-all duration-500 ${
            isLoaded ? "blur-0" : "blur-sm"
            }`}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
        />
        <hr className="md:hidden w-full flex mx-auto h-[2px] bg-gray-300 my-5 border-none" />
      </div>

      {/* Product Details */}
      <div className="md:w-1/2 space-y-4">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-gray-700">{product.description}</p>
        <p className="text-xl font-semibold text-green-600">${product.price}</p>

        {/* Color Selection */}
        <div>
          <p className="font-semibold">Select Color:</p>
          <div className="flex space-x-2 mt-2">
            {colors.map((color) => (
              <button
                key={color}
                className={`w-8 h-8 rounded-full border-2 hover:cursor-pointer ${
                  selectedColor === color ? "border-black" : "border-gray-300"
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        </div>

        {/* Size Selection */}
        <div>
          <p className="font-semibold">Select Size:</p>
          <div className="flex space-x-2 mt-2">
            {sizes.map((size) => (
              <button
                key={size}
                className={`px-4 py-2 border rounded hover:cursor-pointer ${
                  selectedSize === size ? "bg-black text-white" : "bg-gray-200"
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button className="w-full md:w-[15vw] md:ml py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition hover:cursor-pointer"
        onClick={addToCartHandler}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
