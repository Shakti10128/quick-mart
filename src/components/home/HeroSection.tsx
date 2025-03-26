
import useIsMobile from '@/CustomHooks/useIsMobile';
import heroImage from '../../assets/hero_image.jpg';
import heroImage1 from '../../assets/hero_image1.png'
import Button, { PathType } from '../common/Button';
import { FC } from 'react';

interface Path{
  path:PathType
}

const HeroSection:FC<Path> = ({path}) => {  
    return (
      <div className="h-fit pt-5 md:pt-0 w-full bg-[#F2F0F1]">
        <div className="h-full w-full md:px-20 md:flex  items-end gap-40">
          <div className="px-2 md:px-0 flex flex-col gap-5 ml-0 md:ml-10 md:mt-20 md:mb-20">
            <h1 className="text-3xl md:text-6xl font-bold">
              FIND CLOTHES <br /> THAT MATCHES <br /> YOUR STYLE
            </h1>
            <p className="text-gray-600">
              Browse through our diverse range of meticulously crafted garments, designed <br />
              to bring out your individuality and cater to your sense of style.
            </p>

              {/* usIsMobile is a customHook */}
              <Button title="Shop Now" isFullWidth={useIsMobile(728)} path={path}/>
  
            <div className="flex gap-3 md:gap-8 flex-wrap">
              <div>
                <span className="font-bold text-xl md:text-2xl">200+</span>
                <br />
                <span className='text-sm font-semibold' >International Brands</span>
              </div>
              <div>
                <span className="font-bold text-xl md:text-2xl">2,000+</span>
                <br />
                <span className='text-sm font-semibold'>High-Quality Products</span>
              </div>
              <div>
                <span className="font-bold text-xl md:text-2xl">30,000+</span>
                <br />
                <span className='text-sm font-semibold'>Happy Customers</span>
              </div>
            </div>
          </div>
  
          <div className=''>
            <img src={heroImage} alt="hero_image" className="h-[25rem] md:h-[30rem]" />
          </div>
        </div>
  
        <div className="w-full">
          <img src={heroImage1} alt="hero_image_companies_logos" className="md:w-full md:h-full
          h-20 w-fit object-cover md:object-cover" />
        </div>
      </div>
    );
};
  

export default HeroSection