export async function getBrandData(brandId:string) {
    const response=await fetch("https://ecommerce.routemisr.com/api/v1/products?brand="+brandId ,{
          method:"GET",
          cache:"no-cache"
      },)
      const data= await response.json();
      return data;

}