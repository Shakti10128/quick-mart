import { useSelector } from "react-redux"
import ShowProducts from "../common/ShowProducts"
import { selectRecentProducts } from "@/Slices/productsSlice"
import Button from "../common/Button";

const RecentChecks = () => {
  const recentCheckProducts = useSelector(selectRecentProducts);
  return (
    <div className="my-8 w-full px-2 md:px-20">
        {recentCheckProducts.length > 0 ? <ShowProducts products={recentCheckProducts.slice(0,8)}  btnType="add to cart" contentHeading="Recent Activity"/>
        :(
          <div className="h-[50vh] w-full bg-white shadow-2xl border-2 rounded-md">
              <div className="h-full w-full flex flex-col justify-center items-center">
                <h1 className="font-extrabold md:text-4xl">
                  Looks like you haven't searched 
                  <br />
                </h1>
                <h1 className="font-extrabold md:text-4xl mb-5">
                  anthing yet
                </h1>
                <Button title="Checkout" path="/products"/>
              </div>
            </div>
        )
        }
    </div>
  )
}

export default RecentChecks