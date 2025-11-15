"use client"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "react-hot-toast";

import { SessionProvider } from "next-auth/react";
import Navbar from "../Navbar/page";
import CartContextProvider from "../Context/CartContext";
import Footer from "../Footer/page";

export default function Provider({children}:{children:React.ReactNode}) {
  return (
    <SessionProvider>
                  <CartContextProvider>
                
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        
                      >
                        
                       <Toaster/> 
                        <Navbar/>
                        
              <div className="container my-20 ">
                          {children}
                           
                    </div>
                    
                  <Footer/>
            
                      </ThemeProvider>
                
                  </CartContextProvider>
                
                </SessionProvider>
  )
}
