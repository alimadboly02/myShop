"use server"

import getUserToken from "@/app/_components/helper/getToken";

export async function removeFormCartAction(id:string) {
        const secToken = await getUserToken();
        if(!secToken) return;
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart/" + id, {
        method: "DELETE",
        headers: {
            token: secToken + ""
        }
    })
    const data = await response.json()
    return data;
}