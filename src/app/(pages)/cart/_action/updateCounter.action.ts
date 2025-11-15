"use server"

import getUserToken from "@/app/_components/helper/getToken";

export async function updateCounterAction(id:string,counter:number) {
        const token = await getUserToken();
        if(!token) return;
     const response = fetch("https://ecommerce.routemisr.com/api/v1/cart/" + id, {
                body: JSON.stringify({ count:counter }),
                method: "PUT",
                headers: {
                    token: token+"",
                    "Content-Type": "application/json"
                }
            })
            const data = await (await response).json();
            return data;
}