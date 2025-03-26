import { FC } from 'react'
import Product from '../common/Product'
import { ProductInterface } from "@/pages/Products"
import Button from './Button'
import Loader from './Loader'

type PathType = string | "/"

interface ShowProductsInterface{
    contentHeading?:string
    products:ProductInterface[]
    btnContent?:string
    loading?:boolean
    btnType: "add to cart" | "buy now"
    path?:PathType
}

const ShowProducts:FC<ShowProductsInterface> = (
    {contentHeading,products,btnContent,loading,btnType,path})=> {

        if(loading) {
            return <Loader/>
        }

  return (
    <div className="md:mt-5 flex flex-col justify-center items-center">
        {
            contentHeading &&
            <div className="h-40 mt-10 text-black text-4xl font-extrabold">
                {contentHeading}
            </div>
        }

        <div className={`${contentHeading && "-mt-16"} md:ml-10 flex justify-center md:justify-evenly flex-wrap gap-5 md:gap-14 w-full md:w-[80%]`}>
            {
                products.map((product)=>{
                    return <>
                        <Product
                            key={product.id}
                            name={product.name}
                            price={product.price}
                            productUrl={product.productUrl}
                            quantity={product.quantity}
                            description={product.description}
                            id={product.id}
                            loading={loading}
                            btnType={btnType}
                        />
                    </>
                })
            }
        </div>
        {
            btnContent && 
            <div className="mt-8 md:mt-20">
                <Button title={btnContent} path={path}/>
            </div>
        }
    </div>
  )
}

export default ShowProducts