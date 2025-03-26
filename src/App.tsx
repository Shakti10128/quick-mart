import FooterMenu from './components/common/FooterMenu'
import Navbar from '@/components/common/Navbar'
import Auth from './pages/Auth'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import {Slide, toast, ToastContainer} from 'react-toastify'
import Profile from './pages/Profile'
import Products from './pages/Products'
import ProductDetails from "@/pages/ProductDetails"
import BackToTop from './components/common/BackToTop'
import ScrollProgress from './components/common/ScrollProgress'
import Cart from './pages/Cart'
import ContactUs from './pages/ContactUs'
import Footer from './components/common/Footer'
import AboutUs from './pages/AboutUs'
import Order from './pages/Order'
import axios, {isAxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addProducts } from './Slices/productsSlice'
import { backendUrl } from './utils/staticDataAndVariable'
import Address from './pages/Address'
import { AppDispatch } from './Store/Store'
import { fetchUserDetails } from "@/api/userApis"
import RazorypayPayment from './pages/RazorypayPayment'



function App() {
  const [loading,setLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const getAllProducts = async()=>{
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/products/allproducts`);
      dispatch(addProducts(response.data));
    } catch (error) {
      if(isAxiosError(error)) {
        toast(error.response?.data?.message);
        console.log(error);
        return;
      }
        toast("Something went wrong")
        console.log("Something went wrong:", error);
    }
    finally{
      setLoading(false);
    }
  }


  useEffect(()=>{
    getAllProducts();
    fetchUserDetails(dispatch);
  })
  
  return (
    <div className="flex flex-col min-h-screen">

          {/* Routes */}
          <BrowserRouter>
            <Navbar/>
            <ScrollProgress/>
            <Routes>
              <Route path='/' element={<Home loading={loading}/>}/>
              <Route path='/auth' element={<Auth/>}/>
              <Route path='/profile' element={<Profile/>}/>
              <Route path='/products' element={<Products />} />
              <Route path='/products/:keyword' element={<Products />} />
              <Route path='/products/productDetails/:productId' element={<ProductDetails/>}/>
              <Route path='/cart' element={<Cart/>}/>
              <Route path='/support' element={<ContactUs/>}/>
              <Route path='/about-us' element={<AboutUs/>}/>
              <Route path='/user/address' element={<Address/>}/>
              <Route path='/cart/order' element={<Order/>} />
              <Route path='/user/orders/:addressid/payment' element={<RazorypayPayment/>}/>
            </Routes>
            <Footer/>
            <BackToTop/>
            <FooterMenu/>
            {/* toaster for showing messages on action success/failure */}
            <ToastContainer
              position="top-right"
              autoClose={3000}
              transition={Slide} // Apply Slide Animation
            />
          </BrowserRouter>

          
    </div>
  )
}

export default App
