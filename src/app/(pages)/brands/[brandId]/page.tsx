import { product } from '@/interfaces/products';
import { Params } from 'next/dist/server/request/params'
import React from 'react';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import AddWishList from '@/app/_components/WishList/AddWishList';
import AddToCart from '@/app/_components/AddToCart/AddToCart';
import StarRating from '@/app/_components/starRate/page';
import Link from 'next/link';
import Image from 'next/image';
import { TbMoodEmpty } from "react-icons/tb";
import { getBrandData } from './_action/getbrand.action';

export default async function BrandContent({params}:{params:Params}) {
   let {brandId}= await params;
     
      const {data:products} :{data:product[]}=await getBrandData(brandId as string);
  
      console.log("🚀 ~ CategoryContent ~ products:", products);
      let logo= await fetch("https://ecommerce.routemisr.com/api/v1/brands/"+brandId)
      const {data:brand} :{data:any}=await logo.json();
  return (
    <>
    <div className='flex justify-center items-center'>
       <Image src={brand.image} alt={brand.name} width={300} height={300} className=" w-40 h-40 object-center bg-amber-900" />
    </div>
    {
      products.length>0?
             <div className='grid grid-cols-1 px-4 md:px-0 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
  {products?.map((product) => (
          <Card className='relative' key={product._id}>
            <Link href={`/products/${product._id}`}>
            <Image
              src={product.imageCover}
              alt={product.title}
              className='w-full h-70 object-scale-down'
              width={200}
              height={200}
            />
            </Link>
            <CardHeader>
              <CardTitle className='line-clamp-2'>{product.title}</CardTitle>
              <CardDescription>{product.category.name}</CardDescription>
              <CardAction>{product.brand.name}</CardAction>
            </CardHeader>
            <CardContent>
              <p className='line-clamp-2 text-balance pb-2 '>{product.description.slice(0,60)+"..."}</p>
             <div className='flex justify-between py-1.5'>
               <p className='line-clamp-2 hover:translate-x-1 duration-500 rounded-full px-2 bg-amber-400  '>Price: {product.price} EPG</p>
               <p className={`line-clamp-2 text-white ${product.quantity>50? "bg-green-600":"bg-red-700"} rounded-full px-2`}> Quantity: {product.quantity} </p>
  
               </div>
              <div className='flex gap-1.5'>
                {product.ratingsAverage && <p>Rating: {product.ratingsAverage}</p>}
                <StarRating size='w-5' rating={product.ratingsAverage} />
                <p>({product.ratingsQuantity})</p>
              </div>
            </CardContent>
            <CardFooter>
              <AddToCart productId={product._id} />
            </CardFooter>
  
            <AddWishList productId={product._id} />
    </Card>
  ))
  }
  
  
  </div>
      :
      
     <div className='flex justify-center items-center'> 
        <h3 className="text-4xl font-bold text-center text-gray-800 flex justify-center items-center gap-2 flex-col-reverse">No Products Found<TbMoodEmpty size={100} /></h3></div>
      }
      
    
  
    </>
  )
}
