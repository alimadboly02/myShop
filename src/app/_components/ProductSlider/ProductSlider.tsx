"use client"
import React from 'react'
import Autoplay from "embla-carousel-autoplay"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Image from 'next/image';
export default function ProductSlider({images,title}:{images:string[],title:string}) {
  return (
              <Carousel opts={{ loop: true }}
              plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}>
  <CarouselContent>
    {images.map((image,index) => (
      <CarouselItem key={index}><Image className='p-4 rounded-3xl mx-auto ' src={image} alt={title} width={500} height={500} /></CarouselItem>
    ))}
  </CarouselContent>

</Carousel>
  )
}
