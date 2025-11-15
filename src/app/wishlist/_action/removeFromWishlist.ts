"use server"
export async function removeFromWishlistAction(productId:string){
    const response = await fetch(process.env.API_URL+"/wishlist/" + productId, {
        method: "DELETE",
        headers: {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ODY1YmQ2NDA5YTQ0MzA0MTkxNzU5NiIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU4NDkzMzIxLCJleHAiOjE3NjYyNjkzMjF9.iheqdSeUb3gYHTgWAvVmo7v_7fDJ3o32yVD63FJehkI",
            "Content-Type": "application/json"
        }
    })
    const data = await response.json();
    return data;
}