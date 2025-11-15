
import { product } from '@/interfaces/products';
import { Params } from 'next/dist/server/request/params'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import React from 'react'
import Image from 'next/image';
import StarRating from '@/app/_components/starRate/page';
import { Button } from '@/components/ui/button';
import { BiCartAdd } from 'react-icons/bi';
import { FaHeart } from 'react-icons/fa6';

import ProductSlider from '@/app/_components/ProductSlider/ProductSlider';
import AddToCart from '@/app/_components/AddToCart/AddToCart';
import AddWishList from '@/app/_components/WishList/AddWishList';

export default async function ProductDetails({params}:{params:Params}) {
  let {productId}= await params;

    const response=await fetch("https://ecommerce.routemisr.com/api/v1/products/"+productId ,{
        method:"GET",
        cache:"no-cache"
    },)
    const {data:product} :{data:product}=await response.json();
   
    return (
      <div className='relative lg:px-20 px-5 py-5'>
        <Card className='grid grid-cols-3 items-center justify-center relative '>
          <div className=' col-span-3 md:col-span-1 justify-center-safe'>
  <ProductSlider
            images={product.images}
            title={product.title}/>
            
            </div>
  <div className='col-span-3 md:col-span-2 space-y-4'>
    <CardHeader>
      <CardDescription >{product.category.name}</CardDescription>
      <CardTitle className='text-3xl'>{product.title}</CardTitle>
      <CardDescription className='text-justify text-md '>{product.description}</CardDescription>
    </CardHeader>
    <CardContent className='space-y-4'>
     <CardDescription className='text-justify text-lg '>{product.brand.name}</CardDescription>
      <p className=' flex gap-1'>EGP <span className='text-3xl font-semibold'>{product.price}</span></p>
       <p className={`line-clamp-2 text-white w-fit ${product.quantity>50? "bg-green-600":"bg-red-700 "} rounded-full px-2`}> Quantity: {product.quantity} </p>
      <div className='flex items-center gap-1.5'>
        <p className='text-xl'>Rating: {product.ratingsAverage}</p>
        <StarRating size='w-7' rating={product.ratingsAverage} />
        <p>({product.ratingsQuantity})</p>
      </div>
     <CardDescription className='text-justify text-md '> Sold: {product.sold}</CardDescription>
    
    </CardContent>
    <CardFooter className='col-span-3 pt-5'>
     <AddToCart productId={product.id}/>
    
    </CardFooter>
  </div>
  <div className='absolute top-3 right-3 '>
              <AddWishList productId={product._id} />
            </div>
</Card>
      </div>
    )
}
