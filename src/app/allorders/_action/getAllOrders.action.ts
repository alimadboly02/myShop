"use server"
import getUserToken from "@/app/_components/helper/getToken";
import { Orders } from "@/interfaces/order";


export async function getAllOrdersAction(cartOwner:string) {
    const token = await getUserToken();
 const response = await fetch("https://ecommerce.routemisr.com/api/v1/orders/user/"+ cartOwner,{
    method:"GET",
    headers:{
        token:token+""
    }
  })
  const orders :Orders[] = await response.json()
    return orders;
}
