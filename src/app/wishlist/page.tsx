"use client"
import { product } from '@/interfaces/products'

import { FaHeart } from "react-icons/fa6";
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
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { IoHeartDislikeSharp } from "react-icons/io5";

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import StarRating from '@/app/_components/starRate/page';
import Link from 'next/link';
import AddToCart from '@/app/_components/AddToCart/AddToCart';
import { useContext, useEffect, useState } from 'react';
import Loading from '@/app/loading';
import AddWishList from '@/app/_components/WishList/AddWishList';


import toast from 'react-hot-toast';
import { Wishlist } from '@/interfaces/wishlist';
import { removeFromWishlistAction } from './_action/removeFromWishlist';

export default function WishList() {
    const [loading, setLoading] = useState(false)

    async function deleteItem(id:string) {
       const data=await removeFromWishlistAction(id)

        if (data.status  =="success") {
           
            toast(data.message ,{
                icon:'💔'
            })
            getWishList();
        }
       

        
    }
    const [wishData, setWishData] = useState <null|Wishlist>(null)
     async function getWishList() {
        setLoading(true)
         const request = await fetch(process.env.API_URL+"/wishlist" ,
                {
                    method:"GET",
                    headers:{
                        token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ODY1YmQ2NDA5YTQ0MzA0MTkxNzU5NiIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU4NDkzMzIxLCJleHAiOjE3NjYyNjkzMjF9.iheqdSeUb3gYHTgWAvVmo7v_7fDJ3o32yVD63FJehkI"
                    }
                }
            )
            const wishListData : Wishlist = await request.json()
            setWishData(wishListData)
            console.log("🚀 ~ getWishList ~ wishListData:", wishListData)
            setLoading(false)
      }
      useEffect(()=>{
        getWishList()
      },[])
  return <>
  {loading? <Loading/>:
      <div className='grid grid-cols-1 px-4 md:px-0 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
{wishData?.data?.map((product) => (
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

           <div>
                  <div onClick={()=>{deleteItem(product._id);}} className='absolute top-3 right-2 hover:scale-110'>
                      
                       <IoHeartDislikeSharp className='text-gray-400' size={20} />
                      
                      
                    </div>
              </div>
            
  </Card>
))
}


</div>
}


    </>
}