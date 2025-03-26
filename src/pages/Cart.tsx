import ShowProducts from "@/components/common/ShowProducts"
import EmptyCart from "@/components/cart/EmptyCart"
import smoothScrollToTop from "@/utils/smoothScrollToTop"
import { useEffect, useState } from "react"
import { ProductInterface } from "./Products"
import { useSelector } from "react-redux"
import { selectCart } from "@/Slices/cartSlice"
import CartSummary from "@/components/cart/CartSummary"
import { FaCartPlus } from "react-icons/fa"
import Loader from "@/components/common/Loader"

const Cart = () => {
    // productArray.length = 0;
    const [loading,setLoading] = useState<boolean>(true);

    const [cartItems, setCartItems] = useState<ProductInterface[]>([]);
    const cart = useSelector(selectCart).cartItems;

    useEffect(() => {
      smoothScrollToTop();
      setCartItems(cart); // Update state when cart changes
      setLoading(false);
    }, [cart]); // Add edcartItems as a dependency

    if(loading) {
      return <Loader/>
    }
  return (
    <div className="my-10">
        {cartItems.length > 0 ? (
            <div>
                {/* Message for users when they have products in the cart */}
                <div className="flex gap-3 justify-center items-center text-green-600 ">
                      <p className="font-semibold text-[20px] md:text-[] mb-4 text-center">
                      You have {cartItems.length} items in your
                      </p>
                      <FaCartPlus className=" h-8 w-8 -mt-3"/>
                </div>
                
                <ShowProducts products={cartItems} btnType="buy now" path="/products"/>
                <div className="my-16 md-[90%] md:w-[80%] mx-auto">
                  <hr />
                </div>
                <CartSummary cartProducts={cartItems}/>
            </div>
        ) : (
            <EmptyCart/>
        )}
    </div>
  )
}

export default Cart