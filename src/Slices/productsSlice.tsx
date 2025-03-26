import { ProductInterface } from "@/pages/Products"; // Importing product type
import { RootState } from "@/Store/Store"; // Importing RootState type
import { createSlice, PayloadAction } from "@reduxjs/toolkit"; // Importing Redux Toolkit functions

// Initial state with 'items', 'searchProducts', and 'recentCheckProducts' arrays
const initialState: { 
  items: ProductInterface[];
  searchProducts: ProductInterface[];
  recentCheckProducts: ProductInterface[];
} = {
  items: [],
  searchProducts: [],
  recentCheckProducts: [], // New array for recently viewed products
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Replaces 'items' with a new array of products
    addProducts: (state, action: PayloadAction<ProductInterface[]>) => {
      state.items = action.payload;
    },

    // Updates 'searchProducts' with filtered search results
    setSearchProducts: (state, action: PayloadAction<ProductInterface[]>) => {
      state.searchProducts = action.payload;
    },

    // Adds a single product to 'recentCheckProducts' (without duplicates)
    addRecentProduct: (state, action: PayloadAction<ProductInterface>) => {
      const product = action.payload;
      
      // Remove if it already exists (to maintain uniqueness)
      state.recentCheckProducts = state.recentCheckProducts.filter(p => p.id !== product.id);

      // Add the new product to the start of the array
      state.recentCheckProducts.unshift(product);

      // Limit to last 10 viewed products
      if (state.recentCheckProducts.length > 8) {
        state.recentCheckProducts.pop();
      }
    },
  },
});

// Export actions to be used in components
export const { addProducts, setSearchProducts, addRecentProduct } = productsSlice.actions;

// Export the reducer to be added to the Redux store
export default productsSlice.reducer;

// Selector function to get all products
export const selectProducts = (state: RootState) => state.products.items;

// Selector function to get searched products
export const selectSearchProducts = (state: RootState) => state.products.searchProducts;

// Selector function to get recently viewed products
export const selectRecentProducts = (state: RootState) => state.products.recentCheckProducts;
