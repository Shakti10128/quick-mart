import { ProductInterface } from "@/pages/Products";
import { backendUrl } from "@/utils/staticDataAndVariable";
import axios, { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { toast } from "react-toastify";
import ProductDetail from "@/components/product/ProductDetail"
import ShowProducts from "@/components/common/ShowProducts"
import smoothScrollToTop from "@/utils/smoothScrollToTop";
import Loader from "@/components/common/Loader"
import { useSelector } from "react-redux";
import { selectRecentProducts } from "@/Slices/productsSlice";


const ProductDetails = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [product,setProduct] = useState<ProductInterface>();
  const [similarProducts,setSimilarProducts] = useState<ProductInterface[]>([]);
  const {productId} = useParams();

  const recentCheckProducts = useSelector(selectRecentProducts);

  // Fetch products based on the keyword
  const fetchProductById = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${backendUrl}/products/${productId}`);
            console.log(response)
            setProduct(response.data.data.productDTO);
            setSimilarProducts(response.data.data.similarProducts);
        } catch (error) {
            if (isAxiosError(error)) {
                toast(error.response?.data.errorMessage);
                console.log(error);
            } else {
                toast("Something went wrong");
                console.log("Something went wrong:", error);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=>{
      smoothScrollToTop();
      fetchProductById();
    },[productId])

    if(loading) {
      return <Loader/>
    }

  return (
    <div>
      {
        product && <ProductDetail product={product} loading={loading}/>
      }

      <hr className="hidden md:flex md:w-[90%] -mt-20 mx-auto h-[2px] bg-gray-300 my-5 border-none" />

      {similarProducts.length > 0 && <ShowProducts products={similarProducts.slice(0,8)} btnType="add to cart" contentHeading="You might like"/>}

      {recentCheckProducts.length > 0 && <ShowProducts products={recentCheckProducts.slice(0,8)}  btnType="add to cart" contentHeading="Recent Activity"/>}
    </div>
  )
}

export default ProductDetails