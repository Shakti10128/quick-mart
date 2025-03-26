import { handlePayment, initiateOrderWithRazorypay } from "@/api/RazorpayPaymentApis";
import Loader from "@/components/common/Loader";
import { selectUserState } from "@/Slices/userSlice";
import { AppDispatch } from "@/Store/Store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "@/assets/logo.png"

const RazorypayPayment = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [productIds,setProductIds] = useState<number[]|[]>([]);

  const { addressid } = useParams();
  const addressId = Number(addressid);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const buyProduct = useSelector(selectUserState).buyProduct;
  const userid = useSelector(selectUserState).userDetails?.id;
  const orderId = useSelector(selectUserState).razorpayOrderId;
  const totalPriceOfBuyingProduct = useSelector(selectUserState).totalPriceOfBuyingProduct;

    const getIdsOfBuyingProduct = (): number[] => {
        if (buyProduct.length > 0) {
            return buyProduct
                .map((product) => product.id)
                .filter((id): id is number => id !== undefined); // ✅ Remove undefined values
        } else {
            return [];
        }
    };


  useEffect(() => {
    const productids = getIdsOfBuyingProduct();
    setProductIds(productids);
    console.log(productids);
    console.log("totalPrice ", totalPriceOfBuyingProduct);
    // if user refresh the page then the session will be destroy so go again cart page to buy
    if(buyProduct.length === 0){
        navigate("/cart",{replace:true});
    }

    if (userid) {
      initiateOrderWithRazorypay({ userid, totalPriceOfBuyingProduct, setLoading, dispatch });
    }
  }, []);

  const razorpayPaymentHandler = async()=>{
    if(userid && orderId && productIds.length > 0){
        console.log(addressId,orderId,productIds,totalPriceOfBuyingProduct,userid);
        await handlePayment({addressId,orderId,productIds,totalPriceOfBuyingProduct,userid,navigate,dispatch,setLoading});
    }
    else{
        toast("Something went wrong");
    }
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div
        style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            background: "#fff",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            maxWidth: "400px",
            margin: "20px auto",
            textAlign: "center",
        }}
        >
        {/* Company Logo */}
        <img
            src={logo} // Replace with your actual logo URL
            alt="Quick Mart Logo"
            style={{ width: "80px", marginBottom: "10px" }}
        />

        {/* Heading */}
        <h2 style={{ fontSize: "24px", fontWeight: "600", color: "#333", marginBottom: "10px" }}>
            Complete Your Purchase
        </h2>

        {/* Store Info */}
        <p style={{ fontSize: "16px", color: "#666", marginBottom: "10px", fontWeight: "500" }}>
            Thank you for shopping at <strong>Quick Mart</strong>!  
            We offer the best deals on groceries, electronics, and more.
        </p>

        {/* Secure Payment Info */}
        <p style={{ fontSize: "14px", color: "#777", marginBottom: "20px" }}>
            Your payment is secure and encrypted. Click below to proceed.
        </p>

        {/* Payment Button */}
        <button
            onClick={razorpayPaymentHandler}
            style={{
            padding: "12px 24px",
            fontSize: "18px",
            fontWeight: "bold",
            color: "#fff",
            background: "#007bff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            outline: "none",
            }}
            disabled={loading}
        >
            {loading ? "Verifying" : "Pay Now"}
        </button>

        {/* Footer */}
        <p style={{ fontSize: "12px", color: "#999", marginTop: "15px" }}>
            Need help? Contact us at  
            <a href="mailto:support@quickmart.com" style={{ color: "#007bff", textDecoration: "none" }}>
            support@quickmart.com
            </a>
        </p>
        </div>

  );
};

export default RazorypayPayment;
