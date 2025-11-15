"use client"
import { Orders } from '@/interfaces/order'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { getAllOrdersAction } from './_action/getAllOrders.action'

export default function AllOrder() {
  const [data,setData] = useState<Orders[]>([])
async function getOrders() {
const cartOwner=localStorage.getItem("cartOwnerId");
  // const response = await fetch("https://ecommerce.routemisr.com/api/v1/orders/user/"+ cartOwner,{
  //   method:"GET",
  //   headers:{
  //     token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ODY1YmQ2NDA5YTQ0MzA0MTkxNzU5NiIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU4NDkzMzIxLCJleHAiOjE3NjYyNjkzMjF9.iheqdSeUb3gYHTgWAvVmo7v_7fDJ3o32yVD63FJehkI"
  //   }
  // })
  // const orders :Orders[] = await response.json()
 const orders = await getAllOrdersAction(cartOwner as string);
  console.log("🚀 ~ getOrders ~ orders:", orders)
  return orders
}

useEffect(()=>{
  getOrders().then(data=>setData(data))
    .catch(err=>console.log(err))
},[])


  return (
    <>
      <h3 className='text-3xl font-semibold'> All Orders </h3>
      <p className="text-slate-500">Here you can view all your past orders.</p>
      {data.map((order,index)=>{
        return<div key={order._id} className="container mx-auto sm:w-full sm:px-2">
  <div className="w-full flex justify-between items-center mb-3 mt-5 pl-3">
    <div>
      <h3 className="text-lg font-semibold text-slate-800">Order information {index+1}</h3>
      <div className='grid grid-cols-2 gap-x-10 gap-y-2'>
        <p className="text-sm text-slate-500">Order ID: #{order._id}</p>
        <p className="text-sm text-slate-500">Name: {order.user.name}</p>
        <p className="text-sm text-slate-500">Phone: {order.user.phone}</p>
        <p className="text-sm text-slate-500">Date: {order.createdAt.split("T")[0]}</p>
        <p className="text-sm text-slate-500">Total: ${order.totalOrderPrice}</p>
        <p className="text-sm text-slate-500">Status: {order.isDelivered ? "delivered" : "not delivered"}</p>
        <p className="text-sm text-slate-500">Payment Method: {order.paymentMethodType}</p>
        <p className="text-sm text-slate-500"> Payment state: {order.isPaid?"payed":"not payed"}</p>
       
      </div>
      
    </div>
  </div>
  <div className="relative flex flex-col w-full max-h-[250px] overflow-auto text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
    <table className="w-full text-left table-auto min-w-max">
      <thead>
        <tr className="border-b border-slate-300 bg-slate-50">
          <th className="p-4 text-sm font-normal leading-none text-slate-500">Product</th>
          <th className="p-4 text-sm font-normal leading-none text-slate-500">Name</th>
          <th className="p-4 text-sm font-normal leading-none text-slate-500">Quantity</th>
          <th className="p-4 text-sm font-normal leading-none text-slate-500">Price per Item</th>
          <th className="p-4 text-sm font-normal leading-none text-slate-500">Total Price</th>
          <th className="p-4 text-sm font-normal leading-none text-slate-500" />
        </tr>
      </thead>
      <tbody>
        {order.cartItems.map((item,index)=>{
          return <tr key={item._id} className="hover:bg-slate-50">
          <td className="p-4 border-b border-slate-200 py-5">
            <Image width={100} height={100} src={item.product.imageCover} alt={item.product.title} className="w-16 h-16 object-cover rounded" />
          </td>
          <td className="p-4 border-b border-slate-200 py-5">
            <p className="block font-semibold text-sm text-slate-800">{item.product.title}</p>
          </td>
          <td className="p-4 border-b border-slate-200 py-5">
            <p className="text-sm text-slate-500">{item.count}</p>
          </td>
          <td className="p-4 border-b border-slate-200 py-5">
            <p className="text-sm text-slate-500">{item.price}</p>
          </td>
          <td className="p-4 border-b border-slate-200 py-5">
            <p className="text-sm text-slate-500">{item.count*item.price}</p>
          </td>
          
        </tr>
        })}
      </tbody>
    </table>
  </div>
</div>
      })}


  

    </>
  )
}
