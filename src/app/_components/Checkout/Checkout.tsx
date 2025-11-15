"use client"
import { Button } from "@/components/ui/button"
import { IoBagCheckOutline } from "react-icons/io5";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MdPayments } from "react-icons/md"
import { useRef, useState } from "react";
import { json } from "stream/consumers";
import toast, { LoaderIcon } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { placeOrderAction } from "./_action/placeOrder.action";
import { cashOrderAction } from "./_action/cashOrder.action";

export function Checkout({cartId,getCartData}:{cartId: string,getCartData:()=>void}) {
  const [loader, setLoader] = useState<boolean>(false)
  const [loader2, setLoader2] = useState<boolean>(false)
  const router = useRouter();
  const city = useRef<HTMLInputElement>(null);
  const details = useRef<HTMLInputElement>(null);
  const phone = useRef<HTMLInputElement>(null);
 console.log(cartId)
  async function placeOrder( city : string,details:string, phone: string) {
    setLoader2(true)
     const shippingAddress ={
    details,
    phone,
    city
  }
    try {
       const data = await placeOrderAction(cartId,shippingAddress)
        if(data.status === "success"){
          window.location.href = data.session.url
        }

        console.log("🚀 ~ placeOrder ~ data:", data);

        setLoader2(false)
     
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order');
    }
  }


  async function cashPay() {
    setLoader(true)
    
   const shippingAddress ={
        details: details.current?.value,
        phone: phone.current?.value,
        city:city.current?.value
    }
    const payload = await cashOrderAction(cartId,shippingAddress)

    console.log("🚀 ~ cashPay ~ payload :", payload );
setLoader(false);
    if (payload.status == "success"){
      getCartData()
      router.push("/allorders")
      toast.success('create order successfully');
    }
    setLoader(false);

    
  }
  return (<>
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className='w-full bg-green-600 hover:bg-green-500 cursor-pointer text-white p-2 rounded-md'>
            Checkout <IoBagCheckOutline /></Button> 
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Checkout</DialogTitle>
            <DialogDescription>
              Please fill in your shipping information to complete your order.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="city-1">City</Label>
              <Input ref={city} id="city-1" name="city" placeholder="Enter your city" autoComplete="address-level2" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="address-1">Address</Label>
              <Input ref={details} id="address-1" name="address" autoComplete="address" placeholder="Enter your address" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="phone-1">Phone</Label>
              <Input ref={phone} id="phone-1" type="tel" name="phone" placeholder="Enter your phone number" autoComplete="tel" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="destructive">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={() => {
              if (city.current && details.current && phone.current) {
                placeOrder(
                city.current.value,
                   details.current.value,
                  phone.current.value,
                )
              }
            }}>Place Order
            {
                loader2 ? <Loader2 className ='animate-spin'  /> : null
              }
            
            </Button>

            <Button type="submit" variant={"outline"} onClick={()=> cashPay()}  >
              Cash Order
              {
                loader ? <Loader2 className ='animate-spin'  /> : null
              }
              
              </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
    </>
  )
}