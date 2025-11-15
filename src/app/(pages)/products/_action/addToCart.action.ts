"use server"

import getUserToken from "@/app/_components/helper/getToken";


export async function addToCartAction(productId:string){
    const secToken = await getUserToken();

     const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart/",{
            method:"POST",
            headers:{
                token:secToken+"",
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                productId
            })
        })
         const data=await response.json();
         return data;
}
