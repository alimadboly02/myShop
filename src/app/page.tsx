import { BubbleBackground } from "@/components/animate-ui/components/backgrounds/bubble";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
   
<div className="h-[80vh] flex justify-center items-center flex-wrap flex-col gap-4 ">
     <div className="relative z-10">
      <div className="flex justify-center items-center flex-wrap flex-col gap-4 ">
        <h3 className="text-4xl font-bold text-center md:text-7xl sm:text-5xl text-white">Welcome to My Shop</h3>
        <p className="text-sm md:text-lg w-[60%] text-center text-white">Discover the latest trends in fashion and lifestyle products.Quailty guaranteed.
          with fast shipping excellent customer services .
        </p>
        <div className="flex justify-center items-center gap-4">
          <Button size={"lg"} >
            <Link href="/products" >Shop Now</Link>
          </Button>
          <Button size={"lg"} variant="outline" className="text-white bg-transparent ">
            <Link href="/categories" >Discover Categories</Link>
          </Button>
        </div>
      </div>
     </div>
      <BubbleBackground className="absolute inset-0 flex items-center justify-center h-screen  z-[-99]" />
</div>
    
    </>
    
  );
}
