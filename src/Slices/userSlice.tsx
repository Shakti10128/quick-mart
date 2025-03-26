import { ProductInterface } from "@/pages/Products";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// User Interface
export interface UserInterface {
  id: number;
  name: string;
  email: string;
  profileUrl: string;
  role: string;
}

interface UserState {
  token: string | null;
  userDetails: UserInterface | null;
  userOrders: ProductInterface[];
  buyProduct: ProductInterface[];
  totalPriceOfBuyingProduct: number | 0
  razorpayOrderId: string | null
}

const initialState: UserState = {
  token: null,
  userDetails: null,
  userOrders: [],
  buyProduct: [],
  totalPriceOfBuyingProduct : 0,
  razorpayOrderId: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserInterface>) => {
      state.userDetails = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      if (action.payload) {
        Cookies.set("ecom-token", action.payload, { expires: 7 });
      } else {
        Cookies.remove("ecom-token");
      }
    },
    updateProfilePicture: (state, action: PayloadAction<string>) => {
      if (state.userDetails) {
        state.userDetails.profileUrl = action.payload;
      }
    },
    setUserOrders: (state, action: PayloadAction<ProductInterface[]>) => {
      state.userOrders = action.payload;
    },
    addUserOrder: (state, action: PayloadAction<ProductInterface>) => {
      state.userOrders.push(action.payload);
    },
    logoutUser: (state) => {
      state.token = null;
      state.userDetails = null;
      state.userOrders = [];
      state.buyProduct = [];
    },
    
    // ✅ Set the products the user intends to buy weither it is single or multiple products
    setBuyProduct: (state, action: PayloadAction<ProductInterface[]>) => {
      state.buyProduct = action.payload;
    },

    setTotalPriceOfBuyingProdcuts: (state,action: PayloadAction<number>)=>{
      state.totalPriceOfBuyingProduct = action.payload;
    },

    setRazorpayOrderid:(state,action:PayloadAction<string>)=>{
      state.razorpayOrderId = action.payload;
    },

    removeTotalPriceOfBuyingProdcuts:(state)=>{
      state.totalPriceOfBuyingProduct = 0;
    },

    removeRazorpayOrderId:(state)=>{
      state.razorpayOrderId = null;
    },
   // ✅ Clear buyProduct after purchasing (for single or all)
    clearBuyProduct: (state) => {
      state.buyProduct = [];
    },
  },
});

export const { 
  setUser, 
  setToken, 
  updateProfilePicture, 
  setUserOrders, 
  addUserOrder, 
  logoutUser, 
  setBuyProduct, 
  setTotalPriceOfBuyingProdcuts,
  removeTotalPriceOfBuyingProdcuts,
  clearBuyProduct ,
  setRazorpayOrderid,
  removeRazorpayOrderId
} = userSlice.actions;

export default userSlice.reducer;

// Selector to access user state
export const selectUserState = (state: { user: UserState }) => state.user;
