import { fetchAddressesOfUser, handleAddAddress, handleRemoveAddress, handleUpdateAddress } from "@/api/addressApis";
import Loader from "@/components/common/Loader";
import { selectUserState } from "@/Slices/userSlice";
import smoothScrollToTop from "@/utils/smoothScrollToTop";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export interface AddressType {
  id: number;
  userid?: number;
  houseNumber: string;
  pincode: string;
  landmark: string;
  city: string;
}

const Address: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [addresses, setAddresses] = useState<AddressType[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingAddressId, setEditingAddressId] = useState<number | null>(null);
  const [newAddress, setNewAddress] = useState<Omit<AddressType, "id">>({
    houseNumber: "",
    pincode: "",
    landmark: "",
    city: "",
  });

  const navigate = useNavigate();
  const userid = useSelector(selectUserState).userDetails?.id;

  useEffect(() => {
    let redirectTimeout: NodeJS.Timeout | null = null; // Store timeout ID
  
    if (!userid) {
      redirectTimeout = setTimeout(() => {
        navigate("/auth", { replace: true });
        setLoading(false);
      }, 5000);
    } else {
      fetchAddressesOfUser({ userid, setLoading, setAddresses });
    }
  
    smoothScrollToTop();
  
    // Cleanup function: Clear the timeout if user logs in before 5 seconds
    return () => {
      if (redirectTimeout) clearTimeout(redirectTimeout);
    };
  }, [userid]);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addAddressApiHandler = async () => {
    if (userid) {
      await handleAddAddress({ newAddress, userid, setLoading, setShowModal, setAddresses, addresses });
    } else {
      toast("Please refresh the page");
    }
  };

  const removeAddressApiHandler = async (addressId: number) => {
    if (userid) {
      await handleRemoveAddress({ addressId, setLoading, setAddresses, addresses });
    }
  };

  const editAddressApiHandler = async () => {
    setShowModal(false);
    if (userid && editingAddressId !== null) {
      // add userid
      
      const updatedAddress:AddressType = {
        id:editingAddressId,
        city:newAddress.city,
        houseNumber:newAddress.houseNumber,
        landmark:newAddress.landmark,
        pincode:newAddress.pincode,
        userid:userid
        
      }

      await handleUpdateAddress({
        updatedAddress:updatedAddress,
        setLoading,
        setAddresses,
        addresses,
      });
    }
  };

  const proccedWithSelectedAddressHandler = ()=>{
    if(selectedAddress === null){
      toast("Please select address");
      return;
    }
    else{
      navigate(`/user/orders/${selectedAddress}/payment`)
    }
  }

  if (loading) return <Loader />;

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[70vh] p-6">
      <div className={`${showModal ? "blur-md" : ""} w-full max-w-md bg-white shadow-lg rounded-lg p-6`}>
        <h2 className="text-2xl font-semibold text-center mb-4">Manage Addresses</h2>

        {addresses.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600">No address found. Add a new address to continue.</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:cursor-pointer hover:bg-blue-600" onClick={() => setShowModal(true)}>
              Add Address
            </button>
          </div>
        ) : (
          <div>
            {addresses.map((address) => (
              <div key={address.id} className={`flex justify-between items-center border rounded-lg p-4 mb-2 shadow-md w-full ${selectedAddress === address.id ? "bg-blue-100" : "bg-white"}`}>
                <label className="flex flex-col cursor-pointer w-full">
                  <input type="radio" name="address" className="hidden" checked={selectedAddress === address.id} onChange={() => setSelectedAddress(address.id)} />
                  <p className="font-semibold">{address.houseNumber}, {address.landmark}</p>
                  <p className="text-sm text-gray-600">{address.city}, {address.pincode}</p>
                </label>

                <div className="flex gap-2">
                  <button className="bg-green-500 text-white p-2 rounded-lg shadow-md hover:cursor-pointer hover:bg-green-600" onClick={() => { setEditingAddressId(address.id); setNewAddress(address); setShowModal(true); }}>
                    ✏️
                  </button>
                  <button className="bg-red-500 text-white p-2 rounded-lg shadow-md hover:cursor-pointer hover:bg-red-600" onClick={() => removeAddressApiHandler(address.id)}>
                    🗑
                  </button>
                </div>
              </div>
            ))}

            <button className="mt-4 w-full px-4 py-2 bg-black text-white rounded-lg hover:cursor-pointer hover:bg-gray-800"
            onClick={proccedWithSelectedAddressHandler}>
              Proceed with Selected Address
            </button>

            <button className="mt-4 w-full px-4 py-2 bg-black text-white rounded-lg hover:cursor-pointer hover:bg-gray-800" onClick={() => { setEditingAddressId(null); setShowModal(true); }}>
              Add New Address
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-50 bg-opacity-50 backdrop-blur-xl">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">{editingAddressId !== null ? "Edit Address" : "Add New Address"}</h3>
            <div className="space-y-3">
              <input type="text" name="houseNumber" placeholder="House Number" className="w-full p-2 border rounded-lg" onChange={handleChange} value={newAddress.houseNumber} />

              <input type="text" name="pincode" placeholder="Pincode" className="w-full p-2 border rounded-lg" onChange={handleChange} value={newAddress.pincode} />

              <input type="text" name="landmark" placeholder="Landmark" className="w-full p-2 border rounded-lg" onChange={handleChange} value={newAddress.landmark} />

              <input type="text" name="city" placeholder="City" className="w-full p-2 border rounded-lg" onChange={handleChange} value={newAddress.city} />
            </div>

            <div className="mt-4 flex justify-between">
              <button className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:cursor-pointer hover:bg-gray-500" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="px-4 py-2 bg-black text-white rounded-lg hover:cursor-pointer hover:bg-blue-600" onClick={editingAddressId !== null ? editAddressApiHandler : addAddressApiHandler}>
                {editingAddressId !== null ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Address;
