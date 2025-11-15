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

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import StarRating from '@/app/_components/starRate/page';
import Link from 'next/link';
import AddToCart from '@/app/_components/AddToCart/AddToCart';
import { useEffect, useState } from 'react';
import Loading from '@/app/loading';
import AddWishList from '@/app/_components/WishList/AddWishList';
import MySwiper from '@/components/MySwiper/MySwiper';


export default  function Products() {
  const [products, setProducts] = useState<product[]|null>(null)
  const [page, setPage] = useState(1)
  const [loader, setLoader] = useState(false)
   async function getProducts(page: number) {
    const request = await fetch("https://ecommerce.routemisr.com/api/v1/products?page=" + page)
    const { data: products }: { data: product[] } = await request.json()
    return products
  }
  useEffect(() => {
    setLoader(true)
    getProducts(page).then((products) => {
      setProducts(products)
      setLoader(false)
    })
  }, [page])

  return <>
  {/* <MySwiper /> */}
  {loader? <Loading/>:
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
<div className='lg:col-span-3 xl:col-span-4 md:col-span-2 cursor-pointer '>
  <Pagination >
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious onClick={() => setPage((p) => Math.max(1, p - 1))} />
      </PaginationItem>
      <PaginationItem>
        <PaginationNext onClick={() => setPage((p) => p + 1)} />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
</div>

</div>
}


    </>
  
}
