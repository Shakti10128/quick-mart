import ProfileDetails from "@/components/profile/ProfileDetails";
import UserHistory from "@/components/profile/UserHistory";
import smoothScrollToTop from "@/utils/smoothScrollToTop";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUserState } from "@/Slices/userSlice";
import { AppDispatch } from "@/Store/Store";
import Loader from "@/components/common/Loader";
import { fetchUserDetails } from "@/api/userApis";

const Profile = () => {
  const [loading,setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const token = useSelector(selectUserState).token;

  // console.log("Token:", token); // Debugging step

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading before fetching
      const userData = await fetchUserDetails(dispatch);
  
      if (!userData?.token) {
        navigate("/auth", { replace: true });
      }
  
      setLoading(false); // Stop loading after fetching
    };
  
    if (!token) { 
      fetchData();
    } else {
      setLoading(false); // Ensure loading stops if token exists
    }
  
    smoothScrollToTop();
  }, [token, dispatch, navigate]);
  
  
  if(loading) {
    return <Loader/>
  }
  return token ? (
    <div>
      <ProfileDetails />
      <UserHistory />
    </div>
  ) : null; // Prevent rendering if user is being redirected
};

export default Profile;
