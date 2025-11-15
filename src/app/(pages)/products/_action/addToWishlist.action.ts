"use server"

import getUserToken from "@/app/_components/helper/getToken";

export async function addToWishlistAction(productId:string) {
        const secToken = await getUserToken();
        if(!secToken) return;
    const respoonse= await fetch ("https://ecommerce.routemisr.com/api/v1/wishlist",{
        method:"POST",
        headers:{
            token:secToken+"",
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            productId
        })
    })
    const data= await respoonse.json()
   
    return data;
}