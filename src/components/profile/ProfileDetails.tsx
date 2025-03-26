import { selectUserState, updateProfilePicture } from '@/Slices/userSlice';
import { useState, useEffect } from 'react';
import { FaCamera } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { backendUrl } from '@/utils/staticDataAndVariable';
import { toast } from 'react-toastify';

const ProfileDetails = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [profile, setProfile] = useState<string>(""); // Default profile image

  const dispatch = useDispatch();
  const userProfile = useSelector(selectUserState).userDetails;
  const userId = userProfile?.id;

  // Cleanup object URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (profile) {
        URL.revokeObjectURL(profile);
      }
    };
  }, [profile]);

      const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          // Validate file type
          if (!file.type.startsWith("image/")) {
            toast.error("Only image files are allowed.");
            return;
          }
          // Validate file size (max 5MB)
          if (file.size > 5 * 1024 * 1024) {
            toast.error("File size must be less than 5MB.");
            return;
          }

          setSelectedFile(file);
          const imageUrl = URL.createObjectURL(file);
          setProfile(imageUrl);
        }
      };

      const handleFileUpload = async () => {
        if (!selectedFile) {
          toast.error("Please select a file.");
          return;
        }
        if (!userId) {
          toast.error("User ID is missing. Please log in again.");
          return;
        }
      
        const formData = new FormData();
        formData.append("profile", selectedFile);
        formData.append("user_id", String(userId));
      
        setLoading(true);
        try {
          const response = await fetch(`${backendUrl}/users/update/profile`, {
            method: "POST",
            body: formData,
            credentials: "include", // ✅ Allow cookies if needed
            headers: {
              // ❌ DO NOT manually set Content-Type for FormData (browser will do it)
              // "Content-Type": "multipart/form-data", 
            },
          });
      
          const data = await response.json();
          dispatch(updateProfilePicture(data.data.profileUrl));
          toast.success("Profile updated")
          setProfile("");
        } catch (error) {
          toast.error("Error updating profile: " + error);
          toast.error("Something went wrong");
        } finally {
          setLoading(false);
        }
      };
  

  return (
    <div>
      <div className="flex flex-col  h-full  md:flex-row my-10 mx-2 md:mx-10 items-center justify-center md:justify-evenly">
          {/* Profile Update & Showing */}
          <div className="flex flex-col justify-center items-center relative md:mt-16 p-4">
            <div className="relative">
            <img
              src={profile !== "" ? profile : userProfile?.profileUrl}
              alt="profile_picture"
              loading="lazy"
              onLoad={() => setIsLoaded(true)}
              className={`md:h-[15rem] md:w-[15rem] h-48 w-48 rounded-full border-4 border-white shadow-lg ${isLoaded ? "blur-0" : "blur-md"}`}/>
              <label htmlFor="file-input">
                <div className="absolute bottom-2 right-2 bg-gray-800 text-white p-2 rounded-full cursor-pointer hover:bg-gray-700 transition-all">
                  <FaCamera className="h-5 w-5" />
                </div>
              </label>
              <input
                id="file-input"
                type="file"
                name="profile"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <button
              className="mt-3 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
              onClick={handleFileUpload}
              disabled={loading}
            >
              {loading ? "Uploading..." : "Update Profile"}
            </button>
          </div>

          <div className='flex flex-col justify-center w-full h-fit md:h-[30vh] bg-white shadow rounded-md md:w-[50%] gap-8 my-10'>
            <div className='border-b-2 mt-8 mx-4 md:text-2xl font-bold'>
              <h1>Name - {userProfile?.name}</h1>
            </div>
            <div className='border-b-2 mx-4  md:text-2xl font-bold'>
              <h1>Email - {userProfile?.email}</h1>
            </div>
            <div className='mb-4 mx-4 md:text-2xl font-bold'>
              <h1>Role - {userProfile?.role}</h1>
            </div>
          </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
