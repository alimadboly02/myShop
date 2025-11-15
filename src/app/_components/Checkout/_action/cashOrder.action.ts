import getUserToken from "../../helper/getToken";

export async function cashOrderAction(cartId:string,shippingAddress:any) {
    const token = await getUserToken();
  const res =await fetch("https://ecommerce.routemisr.com/api/v1/orders/"+cartId,{
      method: 'POST',
        headers: {
          token: token+"",
          'Content-Type': 'application/json',
        },
      body:JSON.stringify(shippingAddress)
    })
    const payload : any = await res.json()
    return payload;
}