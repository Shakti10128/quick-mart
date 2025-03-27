import { ProductInterface } from "@/pages/Products";
import { FaCartPlus, FaLock, FaShippingFast, FaUndo } from "react-icons/fa";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserState, setBuyProduct, setTotalPriceOfBuyingProdcuts } from "@/Slices/userSlice";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { AppDispatch } from "@/Store/Store";
// import { useNavigate } from "react-router-dom";

interface CartSummaryInterface {
  cartProducts: ProductInterface[];
}

const CartSummary: FC<CartSummaryInterface> = ({ cartProducts }) => {
  const totalItems = cartProducts.length;
  const totalPrice = cartProducts.reduce((acc, item) => acc + item.price, 0);

  const gstRate = 0.18;
  const gstAmount = totalPrice * gstRate;
  const priceWithGST = totalPrice + gstAmount;

  const discount = priceWithGST > 1000 ? priceWithGST * 0.1 : 0;
  const shippingFee = priceWithGST >= 500 ? 0 : 50;

  let finalAmount = priceWithGST - discount + shippingFee;

  // Ensure no decimals
  finalAmount = Math.floor(finalAmount);


  const visibleProducts = cartProducts.slice(0, 5);
  const remainingCount = totalItems - visibleProducts.length;

  const location = useLocation();
  const navigate = useNavigate();
  const token = useSelector(selectUserState).token;
  const dispatch = useDispatch<AppDispatch>();

  const buyProductsHandler = async()=>{
    if(token === null){
      // if no token, redirect to auth page, & when auth success user will comeback to current page
      // coz we have set from: location.pathname, same have to handle at auth page from where user came
      return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
    }
    // adding the product into user state of buying product, when buying will removed the products from
    // there
    // console.log(cartProducts);
    dispatch(setBuyProduct(cartProducts));
    dispatch(setTotalPriceOfBuyingProdcuts(finalAmount));
    navigate("/user/address");
    return;
  }



  return (
    <div className="w-full md:w-[80%] mx-auto bg-white shadow-lg rounded-lg p-5 mt-8">
      <div className="flex gap-1 justify-center items-center">
        <FaCartPlus className="h-8 w-8 -mt-3" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          Cart Summary
        </h2>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center">
        {/* Left Side */}
        <div className="w-full md:w-1/2 text-gray-800">
          <div className="flex items-center space-x-2">
            {visibleProducts.map((product, index) => (
              <img
                key={index}
                src={product.productUrl}
                alt={product.name}
                className="w-12 h-12 rounded-lg shadow-md"
              />
            ))}
            {remainingCount > 0 && (
              <span className="text-gray-600 text-sm font-semibold">
                +{remainingCount} more
              </span>
            )}
          </div>

          {/* Pricing Details (Mobile Optimized) */}
          <div className="mt-4 space-y-2">
            <p className="text-lg font-semibold flex md:justify-start md:gap-2 justify-between w-full">
              <span>Total Products:</span>
              <span className="text-blue-600">{totalItems}</span>
            </p>
            <p className="text-lg font-semibold flex md:justify-start md:gap-2 justify-between w-full">
              <span>Subtotal:</span>
              <span className="text-green-600">₹{totalPrice.toFixed(2)}</span>
            </p>
            <p className="text-md text-gray-600 flex md:justify-start md:gap-2 justify-between w-full">
              <span>GST (18%):</span>
              <span>₹{gstAmount}</span>
            </p>
            <p className="text-lg font-semibold flex md:justify-start md:gap-2 justify-between w-full">
              <span>Total (Incl. GST):</span>
              <span className="text-green-600">₹{priceWithGST.toFixed(2)}</span>
            </p>
            {discount > 0 && (
              <p className="text-md text-red-600 flex md:justify-start md:gap-2 justify-between w-full">
                <span>Discount Applied (10%):</span>
                <span>-₹{discount.toFixed(2)}</span>
              </p>
            )}
            <p className="text-md text-gray-600 flex md:justify-start md:gap-2justify-between w-full">
              <span>Shipping:</span>
              <span>
                {shippingFee === 0 ? (
                  <span className="text-green-600 ml-2">Free</span>
                ) : (
                  `₹${shippingFee}`
                )}
              </span>
            </p>
            <p className="text-lg font-semibold mt-2 flex md:justify-start md:gap-2 justify-between w-full">
              <span className="text-gray-900">Total Payable:</span>
              <span className="text-green-600 font-bold text-xl">
                ₹{finalAmount.toFixed(2)}
              </span>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Estimated Delivery: 3-5 business days
            </p>
          </div>
        </div>

        {/* Right Side - UI Enhancements */}
        <div className="w-full md:w-1/2 flex flex-col items-center mt-4 md:mt-0 bg-gray-100 p-4 rounded-lg shadow-inner">
          {/* Store Branding */}
          <div className="flex items-center space-x-2">
            <h3 className="text-xl font-bold text-gray-900">QuickMart</h3>
          </div>

          {/* Features */}
          <div className="mt-3 space-y-2 text-gray-700 text-sm text-center">
            <p className="flex items-center gap-2">
              <FaLock className="text-blue-600" /> 100% Secure Payment
            </p>
            <p className="flex items-center gap-2">
              <FaShippingFast className="text-green-600" /> Fast & Free Delivery
              (Orders ₹500+)
            </p>
            <p className="flex items-center gap-2">
              <FaUndo className="text-red-600" /> Easy 7-Day Return & Refund
              Policy
            </p>
          </div>

          {/* Buy Button */}
          <button className="w-full md:w-auto bg-black hover:bg-gray-800 text-white py-2 px-6 rounded-lg text-lg font-medium transition-all mt-4 hover:cursor-pointer"
          onClick={buyProductsHandler}
          >
            Buy All Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
