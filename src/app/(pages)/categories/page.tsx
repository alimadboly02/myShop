import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaOpencart } from 'react-icons/fa6'
import { BlinkBlur, FourSquare } from 'react-loading-indicators'

export default async function Categories() { 
  const res = await fetch('https://ecommerce.routemisr.com/api/v1/categories')
  const categories = await res.json()

  console.log("🚀 ~ Categories ~ categories:", categories);

  
  return (
     <>
    <div>
      <h3 className="text-4xl font-bold text-center text-gray-800 dark:text-white">Categories</h3>
  <div className=" py-4 sm:py-6 container mx-auto ">
    <div className="mx-auto container max-w-7xl px-6 lg:px-8">
      <ul role="list" className="mx-auto grid justify-center max-w-2xl grid-cols-1 gap-x-0 gap-y-0 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {categories?.data.map((category : any) => (
           <li key={category._id}>
          
            <Link href={'/categories/'+category._id}>
              <ul role="list" className="flex gap-x-3">
                <div className="m-2 space-y-2">
                  <div className="group flex flex-col gap-1 rounded-lg p-5 text-gray" tabIndex={1}>
                    <div style={{width: 320}} className="group relative m-0 flex h-72 w-72 rounded-xl ring-gray-900/5 sm:mx-auto sm:max-w-lg  hover:text-shadow-gray-800 text-shadow-lg">
                      <div className="z-10 h-full w-full overflow-hidden rounded-xl border border-gray-200 opacity-80 transition duration-300 ease-in-out group-hover:opacity-100 dark:border-gray-700 dark:opacity-70  ">
                        <Image alt="category image" width={300} height={300} src={category.image} className="animate-fade-in block h-full w-full scale-100 transform object-cover object-center opacity-100 transition duration-300 group-hover:scale-110"  />
                      </div>
                      <div style={{ width: '70%'}} className="p-3 rounded-xl opacity-60 absolute bottom-0  z-20 m-0 pb-4 ps-4 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110 group-hover:opacity-100">
                        <h1 className="text-lg font-bold text-white">{category.name}</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </ul>
            
            </Link>
        </li>
        ))}
      </ul>
        
    </div>
  </div>
</div>

     </>
  )
}
