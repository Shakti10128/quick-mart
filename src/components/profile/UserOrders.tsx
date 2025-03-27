import { useDispatch, useSelector } from "react-redux"
import ShowProducts from "../common/ShowProducts"
import { selectUserState, UserInterface } from "@/Slices/userSlice"
import Button from "../common/Button";
import { useState } from "react";
import { useEffect } from "react";
import { fetchUserOrders } from "@/api/userApis";
import Loader from "../common/Loader";
import { AppDispatch } from "@/Store/Store";

const UserOrders = () => {
  const [loading,setLoading] = useState<boolean>(false);

  const userOrders = useSelector(selectUserState).userOrders;
  const user: UserInterface | null = useSelector(selectUserState).userDetails;
  const dispatch = useDispatch<AppDispatch>();

  


  useEffect(()=>{
    // we don't want to fetch orders again & again when user visit the profile we will store orders in redux
    // only will only when when user will refresh the page
    if(user?.id && userOrders.length === 0) {
      const userid = user?.id;
      fetchUserOrders({userid ,setLoading,dispatch});
    }
  },[user])

  if(loading) {
    return <Loader/>
  }

  return (
    <div className="my-8 w-full px-2 md:px-20">
        {
          userOrders.length > 0 ? <ShowProducts products={userOrders} btnType="add to cart"/>
          : (
            <div className="h-[50vh] w-full bg-white shadow-2xl border-2 rounded-md">
              <div className="h-full w-full flex flex-col justify-center items-center">
                <h1 className="font-extrabold md:text-4xl">
                  Looks like you haven't Order
                  <br />
                </h1>
                <h1 className="font-extrabold md:text-4xl mb-5">
                  anthing yet
                </h1>
                <Button title="Checkout" path="/products"/>
              </div>
            </div>
          )
        }
    </div>
  )
}

export default UserOrders