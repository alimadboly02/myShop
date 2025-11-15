import getUserToken from "@/app/_components/helper/getToken";

export async function clearCartAction() {
    const token = await getUserToken();
    if(!token) return;
    const response = fetch("https://ecommerce.routemisr.com/api/v1/cart", {
        method: "DELETE",
        headers: {
            token: token+"",
            "Content-Type": "application/json"
        }
    })
    const data = await (await response).json()
    return data;
}