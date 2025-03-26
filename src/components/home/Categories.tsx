import categoryImg1 from '../../assets/categories/image1.png'
import categoryImg2 from '../../assets/categories/image2.png'
import categoryImg3 from '../../assets/categories/image3.png'
import categoryImg4 from '../../assets/categories/image4.png'
import categoryImg5 from '../../assets/categories/image5.png'
import categoryImg6 from '../../assets/categories/image6.png'
import categoryImg7 from '../../assets/categories/image7.png'
import categoryImg8 from '../../assets/categories/image8.png'
import categoryImg9 from '../../assets/categories/image9.png'
import categoryImg10 from '../../assets/categories/image10.png'
import categoryImg11 from '../../assets/categories/image11.png'
import categoryImg12 from '../../assets/categories/image12.png'
import { Link } from 'react-router-dom'


const Categories = () => {
  return (
    <div className="w-full flex justify-center items-center mt-16">
        <div className="w-full max-w-[1200px] px-4">
          {/* Header Section */}
          <div className="flex px-6 md:px-0 justify-between items-center">
            <h1 className="font-bold text-black text-lg md:text-3xl">Our Categories</h1>
            <Link to={"/products"}>
              <p className="font-bold md:text-xl hover:cursor-pointer underline">View All</p>
            </Link>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-5 p-4 rounded-md">
            {[
              { img: categoryImg1, label: "Dresses" },
              { img: categoryImg2, label: "Leather Bags" },
              { img: categoryImg3, label: "Sweaters" },
              { img: categoryImg4, label: "Boots" },
              { img: categoryImg5, label: "Gift for Him" },
              { img: categoryImg6, label: "Sneakers" },
              { img: categoryImg7, label: "Watch" },
              { img: categoryImg8, label: "Gold Rings" },
              { img: categoryImg9, label: "Cap" },
              { img: categoryImg10, label: "Sunglass" },
              { img: categoryImg11, label: "Baby Shop" },
              { img: categoryImg12, label: "Leather Bags" }
            ].map((category, index) => (
              <div key={index} className="flex flex-col justify-center items-center bg-gray-50 h-32 md:h-40 w-full rounded-md shadow-md p-2">
                <img src={category.img} alt={category.label} className="h-16 w-16 md:h-20 md:w-20 object-contain" />
                <p className="text-sm md:text-base font-semibold mt-2">{category.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
  )
}

export default Categories