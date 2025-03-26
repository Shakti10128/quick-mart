import { RootState } from "@/Store/Store";
import { ProductInterface } from "@/pages/Products";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Define CartItem Type based on ProductInterface
interface CartItem extends ProductInterface {
  totalPrice: number;
  productQuantity: number;
}

// Define CartState Type
export interface CartState {
  cartItems: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

// Load cart from localStorage
const loadCartFromStorage = (): CartState => {
  const storedCart = localStorage.getItem("cart");
  return storedCart
    ? JSON.parse(storedCart)
    : { cartItems: [], totalQuantity: 0, totalPrice: 0 };
};

// Save cart to localStorage
const saveCartToStorage = (cart: CartState) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Initial State
const initialState: CartState = loadCartFromStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add item to cart (only if it doesn't exist)
    addToCart: (state, action: PayloadAction<ProductInterface>) => {
      const existingItem = state.cartItems.find((item) => item.id === action.payload.id);

      if (!existingItem) {
        // Add the product with quantity 1
        state.cartItems.push({
          ...action.payload,
          productQuantity: 1,
          totalPrice: action.payload.price,
        });

        state.totalQuantity += 1;
        state.totalPrice += action.payload.price;

        saveCartToStorage(state);
        toast("Item added to cart!");
      } else {
        toast.info("This item is already in your cart.");
      }
    },

    removeFromCart: (state, action: PayloadAction<number | undefined>) => {
      const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload);
    
      if (itemIndex !== -1) {
        const removedItem = state.cartItems[itemIndex];
    
        // Ensure total price and quantity do not go negative
        state.totalPrice = Math.max(0, state.totalPrice - removedItem.totalPrice);
        state.totalQuantity = Math.max(0, state.totalQuantity - 1);
    
        // Remove the item from cart
        state.cartItems.splice(itemIndex, 1);
    
        saveCartToStorage(state);
        toast("Item removed from cart!");
      }
    },
    

    // Clear cart
    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      localStorage.removeItem("cart");
    },
  },
});

// **Export Actions**
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

// **Export Selector**
export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;
