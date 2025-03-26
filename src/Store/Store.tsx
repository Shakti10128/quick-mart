import { configureStore } from '@reduxjs/toolkit'
import userReducer from '@/Slices/userSlice'
import cartReducer from '@/Slices/cartSlice'
import productsReducer from "@/Slices/productsSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    products: productsReducer
  },
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch