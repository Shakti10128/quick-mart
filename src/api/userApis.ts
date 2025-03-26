import { setToken, setUser, setUserOrders } from "@/Slices/userSlice";
import { AppDispatch } from "@/Store/Store";
import { backendUrl } from "@/utils/staticDataAndVariable";
import axios from "axios";
import { toast } from "react-toastify";

interface UserPlacedOrderInterface {
  userid: number;
  setLoading: (loading: boolean) => void;
  dispatch: AppDispatch; // ✅ Correct type for dispatch
}


export const fetchUserOrders = async ({userid,setLoading,dispatch}:UserPlacedOrderInterface) => {
    if (!userid) {
      toast("User ID is missing!");
      return;
    }

    try {
        setLoading(true);
        const response = await axios.get(`${backendUrl}/orders/user-orders/${userid}`,{
            withCredentials:true
        });
        console.log(response.data); // Debugging output
        dispatch(setUserOrders(response.data.data));
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast(error.response?.data?.message || "Failed to fetch order");
        } else {
          toast("An unexpected error occurred");
        }
        console.error(error);
      } finally {
        setLoading(false);
      }      
  };

  export const fetchUserDetails = async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(`${backendUrl}/users/get-login-user`, {
        withCredentials: true,
      });
  
      dispatch(setToken(response.data.token));
      dispatch(setUser(response.data.data));
  
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };