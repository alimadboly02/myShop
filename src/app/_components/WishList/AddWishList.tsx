"use client"
import WishList from '@/app/wishlist/page'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { FaHeart } from 'react-icons/fa6'

import { cartContext } from '../Context/CartContext'
import { addToWishlistAction } from '@/app/(pages)/products/_action/addToWishlist.action'

export default function AddWishList({productId}:{productId:string}) {
    
    const{getCartData}=useContext(cartContext)
    const [love, setLove] = useState(false);
async function addToWishList(productId:string) {
    const data = await addToWishlistAction(productId);
    if(data.status==="success"){
        toast.success(data.message,{
  icon: '❤️',
})
      
        
        setLove(true)
    }
}
  return (
    <div>
        <div onClick={()=>addToWishList(productId)} className='absolute top-3 right-2 hover:scale-110 hover:text-red-600'>
            
              <FaHeart className={love?"text-red-600":"text-gray-400"} size={20} />
            
          </div>
    </div>
  )
}

