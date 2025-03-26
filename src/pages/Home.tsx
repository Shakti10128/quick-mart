import Categories from '@/components/home/Categories'
import HeroSection from '@/components/home/HeroSection'
import BrandProduct from '@/components/home/BrandProduct'
import ShowProducts from '@/components/common/ShowProducts'
import { FC, useEffect } from 'react'
import smoothScrollToTop from '@/utils/smoothScrollToTop'
import { useSelector } from 'react-redux'
import { selectProducts } from '@/Slices/productsSlice'

interface loadingInterface{
  loading:boolean
}

const Home :FC<loadingInterface>= ({loading}) => {

  const products = useSelector(selectProducts)
  // console.log("Home products from slice " , products);
  const newArrivals = products.slice(-4);
  const topSelling = products.slice(0,4);

  useEffect(()=>{
    smoothScrollToTop();
  })
  return (
    <div>
        <HeroSection path='/products'/>
        {/* new arrivals */}
        {
          newArrivals.length > 0 && <>
              <ShowProducts contentHeading='New Arrivals' products={newArrivals} btnContent='View All' path='/products' btnType='add to cart'/>
              <div className='flex items-center w-full justify-center'>
                <hr className="border-t border-gray-300 my-8 w-[80%]" />
              </div>
          </>
        }
        {/* top selling */}
        {
          topSelling.length > 0 && <>
            <ShowProducts contentHeading='Top Selling' products={topSelling} btnContent='View All' path='/products' btnType='add to cart' loading={loading}/>
            <div className='flex items-center w-full justify-center'>
                <hr className="border-t border-gray-300 my-8 w-[80%]" />
            </div>
          </>
        }


        <Categories/>
        <BrandProduct/>
    </div>
  )
}

export default Home