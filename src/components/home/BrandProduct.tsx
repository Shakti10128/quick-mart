import categoryImg1 from '../../assets/productBrand/image1.png'
import categoryImg2 from '../../assets/productBrand/image2.png'
import categoryImg3 from '../../assets/productBrand/image3.png'
import categoryImg4 from '../../assets/productBrand/image4.png'
import categoryImg5 from '../../assets/productBrand/image5.png'
import categoryImg6 from '../../assets/productBrand/image6.png'
import categoryImg7 from '../../assets/productBrand/image7.png'
import categoryImg8 from '../../assets/productBrand/image8.png'
import categoryImg9 from '../../assets/productBrand/image9.png'
import categoryImg10 from '../../assets/productBrand/image10.png'
import categoryImg11 from '../../assets/productBrand/image11.png'
import categoryImg12 from '../../assets/productBrand/image12.png'
import { Link } from 'react-router-dom'

const BrandProduct = () => {
  return (
    <div className="w-full flex justify-center items-center my-16">
      <div className="w-full lg:w-[80%] container mx-auto px-4">
        {/* Header Section */}
        <div className="flex px-6 md:px-4 justify-between items-center">
          <h1 className="font-bold text-black text-lg md:text-3xl">Brand of Products</h1>
          <Link to={"/products"}>
            <p className="font-bold md:text-xl hover:cursor-pointer underline">View All</p>
          </Link>
        </div>

        {/* Category Items Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-4 mt-6 px-6 md:px-2">
          {[
            categoryImg1, categoryImg2, categoryImg3, categoryImg4, categoryImg5,
            categoryImg6, categoryImg7, categoryImg8, categoryImg9, categoryImg10,
            categoryImg11, categoryImg12
          ].map((image, index) => (
            <div 
              key={index} 
              className="flex flex-col justify-center items-center bg-white rounded-lg p-4 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <img 
                src={image} 
                alt={`Category ${index + 1}`} 
                className="h-20 w-20 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>

  )
}

export default BrandProduct