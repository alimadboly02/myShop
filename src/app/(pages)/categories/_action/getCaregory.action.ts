export async function getCateoryData(categoryId:string) {
    const response=await fetch("https://ecommerce.routemisr.com/api/v1/products?category="+categoryId ,{
          method:"GET",
          cache:"no-cache"
      },)
      const data= await response.json();
      return data;
}