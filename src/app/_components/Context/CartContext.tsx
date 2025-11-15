'use client'
import { CartData } from "@/interfaces/cartData";
import { createContext, useEffect, useState } from "react";
import React from 'react'
import getUserToken from "../helper/getToken";
export const cartContext= createContext<
{
    CartItem: CartData | null,
    setCartItem: (cartItem: CartData | null) => void,
    isLoading: boolean,
    setIsLoading: (isLoading: boolean) => void, 
    getCartData: () => void, 
}
>({
    CartItem:null,
    setCartItem:()=>{},
    isLoading:true,
    setIsLoading:()=>{},
    getCartData: () => {}, 
})
 export default function CartContextProvider({children}:{children:React.ReactNode}) {
    const [CartItem, setCartItem] = useState <CartData | null>(null);
    const [isLoading, setIsLoading] = useState <boolean>(true);
   async function getCartData(){
        const secToken = await getUserToken();
        if(!secToken) return;

        const request = await fetch("https://ecommerce.routemisr.com/api/v1/cart" ,
            {
                method:"GET",
                headers:{
                    token:secToken+"",
                }
            }
        )
        const cartData : CartData = await request.json()
        

        console.log("🚀 ~ getCartData ~ cartData:", cartData);
        if(cartData.data.cartOwner){
  localStorage.setItem("cartOwnerId",cartData.data.cartOwner)
        }
      
        setCartItem(cartData)
        setIsLoading(false)
        
    }
    useEffect(()=>{
        getCartData()
            .catch(err=>console.log(err))
    },[])



   return (
     <cartContext.Provider value={{CartItem,setCartItem,isLoading,setIsLoading,getCartData}}>
        {children}
     </cartContext.Provider>
   )
 }
 