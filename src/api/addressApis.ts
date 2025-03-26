import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "@/utils/staticDataAndVariable";
import { AddressType } from "@/pages/Address";

interface FetchAddressesParams {
  userid: number;
  setLoading: (loading: boolean) => void;
  setAddresses: (addresses: AddressType[]) => void;
}

export const fetchAddressesOfUser = async ({
  userid,
  setLoading,
  setAddresses
}: FetchAddressesParams) => {
  console.log(userid);
  setLoading(true);
  try {
    const response = await axios.get(`${backendUrl}/addresses/user/${userid}`, {
      withCredentials: true,
    });
    console.log(response.data); // debugging
    setAddresses(response.data.data);
    toast(response.data.message);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast(error.response?.data.errorMessage || "Error fetching addresses");
      return;
    }
    toast("Failed to fetch addresses");
    console.log(error);
  } finally {
    setLoading(false);
  }
};



// Interface for Function Parameters
interface HandleAddAddressParams {
  newAddress: Omit<AddressType,"id">;
  userid: number;
  setLoading: (loading: boolean) => void;
  addresses:AddressType[];
  setAddresses:(address:AddressType[]) => void;
  setShowModal: (show: boolean) => void;
}

export const handleAddAddress = async ({
  newAddress,
  userid,
  setLoading,
  addresses,
  setShowModal,
  setAddresses
}: HandleAddAddressParams) => {
  newAddress.userid = userid;

  // 🔹 Validate required fields
  if (!newAddress.houseNumber || !newAddress.pincode || !newAddress.landmark || !newAddress.city) {
    toast("Please fill all fields");
    return;
  }

  try {
    setLoading(true);
    setShowModal(false);

    const response = await axios.post(`${backendUrl}/addresses/create-address`, newAddress, {
      withCredentials: true,
    });

    if (response.status === 201 || response.status === 200) {
      toast("Address added successfully");
      const updatedAdderssList: AddressType[] = [...addresses,response.data.data];
      setAddresses(updatedAdderssList);
    } else {
      toast("Failed to add address");
    }

    console.log(response.data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      toast(error.response.data.errorMessage || "Error adding address");
    } else {
      toast("Something went wrong");
    }
    console.log(error);
  } finally {
    setLoading(false);
  }
};


interface AddressParamsInterce{
    addressId:number;
    addresses:AddressType[];
    setLoading: (loading:boolean) => void;
    setAddresses:(address:AddressType[]) => void;
}


export const handleRemoveAddress = async ({
    addressId,
    setLoading,
    setAddresses,
    addresses, // Add addresses array to parameters
  }: AddressParamsInterce) => {
    try {
      setLoading(true);
      const response = await axios.delete(`${backendUrl}/addresses/delete/${addressId}`, {
        withCredentials: true,
      });
  
      if (response.status === 200) {
        toast("Address removed successfully");
  
        // Update state: Remove the deleted address from the addresses array
        const filteredAddress: AddressType[] = addresses.filter(address => address.id !== addressId);
        setAddresses(filteredAddress);
      } else {
        toast("Failed to remove address");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast(error.response.data.errorMessage || "Error removing address");
      } else {
        toast("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };


interface updatedAdderssInterface{
    updatedAddress:AddressType;
    setLoading:(loading:boolean)=>void;
    setAddresses:(addresses:AddressType[])=>void;
    addresses:AddressType[];
}

export const handleUpdateAddress = async ({
    addresses,
    setAddresses,
    setLoading,
    updatedAddress
  }: updatedAdderssInterface) => {
    try {
      setLoading(true);
      const response = await axios.put(`${backendUrl}/addresses/update-address`, updatedAddress, {
        withCredentials: true,
      });
  
      if (response.status === 200) {
        toast("Address updated successfully");
  
        // Update state with the modified address
        setAddresses(addresses.map(addr => 
          addr.id === updatedAddress.id ? updatedAddress : addr
        ));
      } else {
        toast("Failed to update address");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast(error.response.data.errorMessage || "Error updating address");
      } else {
        toast("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
};

  

