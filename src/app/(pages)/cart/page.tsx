"use client"
import { FaRegTrashAlt } from "react-icons/fa";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import React, { useContext, useState } from 'react'
import { IoIosAdd } from "react-icons/io";
import { IoIosRemove } from "react-icons/io";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cartContext } from "@/app/_components/Context/CartContext";
import Image from "next/image";
import StarRating from "@/app/_components/starRate/page";
import { Button } from "@/components/ui/button";
import { AiOutlineClose } from "react-icons/ai";
import Loading from "@/app/loading";
import toast from "react-hot-toast";
import { Item } from "@radix-ui/react-navigation-menu";
import { Check, LoaderCircle, LoaderIcon } from "lucide-react";
import { json } from "stream/consumers";
import { get } from "http";
import Link from "next/link";
import { Checkout } from "@/app/_components/Checkout/Checkout";
import { removeFormCartAction } from "./_action/removeFormCart";
import { updateCounterAction } from "./_action/updateCounter.action";
import { clearCartAction } from "./_action/clearCart.action";



export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "EGP",
    }).format(amount)
}
export default function Cart() {
    let { CartItem, isLoading, getCartData, setCartItem } = React.useContext(cartContext)

    if(typeof CartItem?.data?.products[0]?.product == 'string'|| CartItem == null) {getCartData();}
    const [isRemoveItem, setIsRemoveItem] = useState<string | null>()
    async function itemRemover(id: string) {
        setIsRemoveItem(id)
        const data = await removeFormCartAction(id)
        if (data.status == 'success') {
            setCartItem(data)
            toast.success(' Item removed successfully', {
                icon: '🗑️',
            });
            setIsRemoveItem(null)
        }

    }
    const [isUpdatingId, setIsUpdatingId] = useState<string|null>(null)
    async function updateCount(id: string, count: number) {
        setIsUpdatingId(id)
        if (count <= 0) {
            itemRemover(id)
            return
        }
       const data = await updateCounterAction(id,count)
        if (data.status == 'success') {
            setCartItem(data)
        }
        setIsUpdatingId(null)
    }
    const [isClearing, setIsClearing] = useState<boolean>(false)
    async function clearCart() {
        const data = await clearCartAction()
        if (data.message == 'success') {
            setCartItem(null)
            toast.success(' Cart cleared successfully', {
                icon: '🚫',
            })

        }
        setIsClearing(false)
    }
    return (
        <>
            { isLoading || typeof CartItem?.data.products[0]?.product == 'string' ? <Loading /> : CartItem?.numOfCartItems! >0 ?
                <>
                    <h3 className='text-4xl font-bold'>Cart content</h3>

                    <p className='text-md text-gray-500 ps-5'>{CartItem?.numOfCartItems} items in your cart</p>
                    <div className='flex flex-wrap px-5 sm:px-0 py-5'>

                        <div className='w-full md:w-3/6 lg:w-4/6 py-4 md:px-4 md:py-0 flex flex-col gap-3 overflow-auto h-screen'>
                            {CartItem?.data.products.map((products) => {
                                return <div key={products._id} className="flex flex-wrap border-2 shadow-lg w-full rounded-2xl py-3 relative ">
                                    <Image className=" w-28 h-28 md:w-32 md:h-32 object-cover px-2 rounded-lg " src={products.product.imageCover} alt="title" width={200} height={200} />
                                    <div className="flex flex-col justify-between ">
                                        <p className="text-lg font-bold">{products.product.title}</p>
                                        <p className="text-md"> {products.product.brand.name} </p>
                                        <div className="text-sm text-gray-500 flex gap-2">rate: {products.product.ratingsAverage!} <StarRating size="w-5" rating={products.product.ratingsAverage!} /></div>
                                        <p className="text-lg ">{formatCurrency(products.price)}</p>
                                        <div className="flex  items-center gap-3">
                                            <Button variant="outline" size="icon" className="size-8 " onClick={() =>
                                                updateCount(products.product.id, products.count + 1)
                                            }>
                                                <IoIosAdd />
                                            </Button>
                                            <p className="text-md">
                                                { products.product.id == isUpdatingId ? <div className="animate-spin"><LoaderCircle /></div> : products.count}</p>
                                            <Button disabled={products.count <= 1} onClick={() =>
                                                updateCount(products.product.id, products.count - 1)
                                            } variant="outline" size="icon" className="size-8">
                                                <IoIosRemove />
                                            </Button>


                                        </div>

                                    </div>
                                    <Button variant="ghost" onClick={() => { itemRemover(products.product.id) }} className="absolute top-3 right-3 cursor-pointer hover:text-red-600">
                                        {
                                            isRemoveItem == products.product.id ? <div className="animate-spin"><LoaderCircle /></div> : <AiOutlineClose size={20} />
                                        }
                                    </Button>

                                </div>
                            })}


                        </div>
                        {/* total pay part */}
                        <div className='w-full md:w-3/6 lg:w-2/6'>
                            <Card>
                                <CardHeader>
                                    <CardTitle className='text-xl flex gap-2 items-center'> <LiaFileInvoiceDollarSolid size={24} />Order summary </CardTitle>


                                </CardHeader>
                                <CardContent>
                                    <div className="flex justify-between ">
                                        <CardDescription>Subtotal ({CartItem?.numOfCartItems}  item)</CardDescription>
                                        <div className="text-right text-lg font-semibold">
                                            <p>{formatCurrency(CartItem?.data.totalCartPrice!)}</p>
                                        </div>

                                    </div>
                                    <div className="flex justify-between mt-2">
                                        <CardDescription>shipping</CardDescription>
                                        <div className=" text-lg font-semibold text-green-600">
                                            <p>Free</p>
                                        </div>

                                    </div>
                                    <Separator className="my-2" />
                                    <div className="flex justify-between">
                                        <div className="text-right text-lg font-bold">
                                            <p>Total</p>
                                        </div>
                                        <div className="text-right text-lg font-bold">
                                            <p>{formatCurrency(CartItem?.data.totalCartPrice!)}</p>
                                        </div>

                                    </div>
                                </CardContent>
                                <CardFooter className="flex flex-col gap-2">
                                    <div className="w-full"><Checkout getCartData={getCartData} cartId={CartItem?.cartId!} /></div>
                                    <Button onClick={clearCart} className=' cursor-pointer w-full bg-red-600  text-white p-2 rounded-md flex items-center justify-center gap-2 hover:bg-red-500'>Clear Cart {isClearing ? <div className="animate-spin"><LoaderCircle /></div> : <FaRegTrashAlt size={20} />}
                                    </Button>
                                    <Button className=' cursor-pointer w-full  p-2  rounded-md'>Continue Shopping</Button>

                                </CardFooter >
                            </Card>
                        </div>




                    </div>


                </>:
                <div className="min-h-[60vh] flex flex-col gap-3 justify-center items-center flex-wrap">
                    <img src="/empty-cart.png" alt="empty cart" className="w-90" />
                    <h3 className='text-center text-2xl font-bold  '>Cart is empty</h3>
                     <Button variant={'default'} className=' cursor-pointer  rounded-md '><Link href="/products">Go Shopping</Link></Button>
                    
                    </div>
            }



        </>
    )
}
