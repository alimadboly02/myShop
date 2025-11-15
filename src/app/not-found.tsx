import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { GoHomeFill } from "react-icons/go";

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <Image
      src="/error.png"
      alt="Picture of the author"
      width={600}
      height={600}
      priority={true}
    /> 
        <Button size={"lg"} className='py-2 px-4 animate-bounce flex font-bold ' variant={'destructive'}>
 <Link href="/">Go back to home </Link>
 <GoHomeFill />
        </Button>
       
        
    </div>
  )
}
