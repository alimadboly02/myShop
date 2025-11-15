"use client"
import { AiOutlineLoading } from "react-icons/ai";
import { Slider } from "@/components/ui/slider"
import React, { useContext, useEffect, useState } from 'react'
import { BiCartAdd } from 'react-icons/bi'
import { Button } from '@/components/ui/button'
import toast from "react-hot-toast";
import { cartContext } from "../Context/CartContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { addToCartAction } from "@/app/(pages)/products/_action/addToCart.action";

export default function AddToCart({productId}:{productId:string}) {
    const [loading, setLoading] = useState(false)
    const {getCartData,setCartItem} = useContext(cartContext)
    const router = useRouter()
    const session = useSession()

    
    async function addToCart() {
        
        if(session.status=="authenticated"){
         setLoading(true)
      
        const data= await addToCartAction(productId)
        if(data.status==='success'){
            setCartItem(data)
            toast.success(data.message)
        }
       data.status==='error' && toast.error(data.message)
    //    getCartData()

         setLoading(false)
    }else{
        router.push("/login")
        
    }
    }


  return (
     <Button disabled={loading} onClick={()=>addToCart()} size={'lg'} className='w-full '>Add to Cart {loading? <AiOutlineLoading size={24} className="animate-spin" /> :<BiCartAdd size={24} /> } </Button>

  )
}

