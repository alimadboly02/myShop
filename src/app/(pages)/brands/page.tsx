import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default async function Brands() {
  const response =await fetch("https://ecommerce.routemisr.com/api/v1/brands",{
    method:"GET",
    cache:"no-cache"
  })
  const data = await response.json();
  const brands = data.data;

  console.log("🚀 ~ Brands ~ brands:", brands);


  return<>
     <div>
      <h3 className="text-4xl font-bold text-center text-gray-800 dark:text-white py-3.5 ">Brands</h3>
  <div className='grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2  justify-center items-center gap-3 pt-4 px-3 sm:px-0'>
  {brands.map((brand:any)=>{
    return(
      <div className=' border-1 shadow-md border-gray-200 rounded-lg overflow-hidden ' key={brand._id}>
      <Link href={`/brands/${brand._id}`}>
      <Image src={brand.image} alt={brand.name} width={300} height={300} className=" w-full  h-30 object-center hover:scale-105 transition-all duration-300  overflow-hidden" />
      </Link>
   </div>
    )
  })}
  
   
</div>
</div>
<div>


</div>
  </>
  }
