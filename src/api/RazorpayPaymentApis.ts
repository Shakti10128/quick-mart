import { clearBuyProduct, removeRazorpayOrderId, removeTotalPriceOfBuyingProdcuts, setRazorpayOrderid } from "@/Slices/userSlice";
import { AppDispatch } from "@/Store/Store";
import { backendUrl, razarpay_API_KEY } from "@/utils/staticDataAndVariable";
import axios from "axios";
import { toast } from "react-toastify";
import {SuccessResponse} from '@/types/razorpay';

import logo from "@/assets/logo.png";
import { NavigateFunction } from "react-router-dom";
import { clearCart } from "@/Slices/cartSlice";


interface initiateOrderWithRazorypayInterface{
  userid:number,
  totalPriceOfBuyingProduct:number
  setLoading:(loading:boolean)=>void;
  dispatch:AppDispatch
}

export const initiateOrderWithRazorypay = async(
  {userid,totalPriceOfBuyingProduct,setLoading,dispatch}:initiateOrderWithRazorypayInterface
  )=>{

    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/orders/create-orders/${userid}/${totalPriceOfBuyingProduct}`,{
        withCredentials:true
      })
      console.log(response.data);
      console.log(response.data.razorpayResponse);
      dispatch(setRazorpayOrderid(response.data.razorpayResponse.id));
      
    } catch (error) {
      if(axios.isAxiosError(error)){
        toast(error.response?.data.errorMessage);
      }
    }
    finally{
      setLoading(false)
    }
}



// 
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};


interface paymentInterface{
  orderId:string
  totalPriceOfBuyingProduct:number
  userid:number,
  addressId:number
  productIds:number[]
  navigate:NavigateFunction
  dispatch:AppDispatch
  setLoading:(loading:boolean)=>void;
}

export const handlePayment = async (
  { orderId, totalPriceOfBuyingProduct, addressId, productIds, userid, navigate, dispatch,setLoading }: paymentInterface
) => {
  const scriptLoaded = await loadRazorpayScript();

  if (!scriptLoaded || !window.Razorpay) {
    console.error("Razorpay SDK failed to load!");
    toast.error("Failed to load payment gateway!");
    return;
  }

  if (!orderId) {
    toast.warn("Order ID not generated yet, please try again.");
    return;
  }


  const options = {
    key: razarpay_API_KEY, // Replace with your Razorpay Key
    amount: totalPriceOfBuyingProduct * 100, // Amount in paise
    currency: "INR",
    order_id: orderId,
    name: "Quick Mart",
    description: "Test Transaction",
    image: `${logo}`,
    handler: async (response: SuccessResponse) => {
      setLoading(true);
      console.log("✅ Payment Successful:", response);

      // ✅ Show a persistent loading toast until verification completes
      const toastId = toast.loading("Verifying payment, please wait...");

      setTimeout(async () => {
        try {
          const verifyResponse = await axios.post(
            `${backendUrl}/orders/verify-payment`,
            {
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
              userid: userid,
              addressId: addressId,
              productIds: productIds,
            },
            { withCredentials: true }
          );

          if (verifyResponse.status === 200) {
            toast.update(toastId, {
              render: "✅ Payment verified successfully!",
              type: "success",
              isLoading: false,
              autoClose: 3000,
            });

            dispatch(clearCart());
            dispatch(clearBuyProduct());
            dispatch(removeRazorpayOrderId());
            dispatch(removeTotalPriceOfBuyingProdcuts());
            navigate("/profile", { replace: true });
          } else {
            toast.update(toastId, {
              render: "❌ Payment verification failed! Please contact support.",
              type: "error",
              isLoading: false,
              autoClose: 4000,
            });
          }
        } catch (error) {
          toast.update(toastId, {
            render:
              axios.isAxiosError(error) && error.response
                ? error.response.data.errorMessage || error.response.data.message
                : "Something went wrong during verification.",
            type: "error",
            isLoading: false,
            autoClose: 4000,
          });
          console.log(error);
          navigate("/cart", { replace: true });
        }
        finally{
          setLoading(false);
        }
      }, 5000);
    },
    prefill: {
      name: "John Doe",
      email: "johndoe@example.com",
      contact: "9999999999",
    },
    theme: {
      color: "#3399cc",
    },
  };

  const rzp1 = new window.Razorpay(options);
  rzp1.open();
};
