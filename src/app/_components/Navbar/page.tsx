
"use client"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import * as React from "react"
import { Loader, LoaderCircle, Moon, ShoppingCart, ShoppingCartIcon, Sun, User } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { RiUserLine } from "react-icons/ri";
import { IoCartOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { MdOutlineMenu } from "react-icons/md";
import { FaOpencart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'
import { User2Icon } from 'lucide-react'
import Sidebar from "../starRate/page"
import SidebarUi from "../starRate/page"
import { usePathname } from "next/navigation"
import { cartContext } from "../Context/CartContext"
import { signOut, useSession } from "next-auth/react"




export default function Navbar() {
  const { setTheme } = useTheme()
  const [sidebar, setSidebar] = React.useState(false);
  const pathname = usePathname()
  const { CartItem } = React.useContext(cartContext)
  const session = useSession()






  function toggleSidebar() {
    setSidebar(!sidebar);
  }
  return (
    <>


      <div>

        <nav className='py-3 bg-gray-100 shadow-xl dark:bg-gray-800 font-semibold px-4 sm:px-0 fixed top-0 left-0 right-0 z-50 '>
          <div className="container">
            <div className='flex items-center justify-between '>
              <Link href="/">
                <h1 className='text-2xl font-bold flex items-center gap-2 hover:translate-x-1 duration-500'> <FaOpencart size={30} /> My Shop </h1>
              </Link>
              <NavigationMenu className="space-x-4 hidden lg:flex " >
                <NavigationMenuList className="space-x-4" >
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/products">Products</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>


                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/categories">Categories</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/brands">Brands</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                </NavigationMenuList>
              </NavigationMenu>

              <div onClick={() => toggleSidebar()} className="lg:hidden order-first duration-300">
                <Sheet>
                  <SheetTrigger>
                    <MdOutlineMenu size={28} />
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[280px] " >
                    <SheetHeader className="text-left p-0 mt-5" >
                      <ul className="py-5">
                        <li className={`sidebarItem hover:bg-accent-foreground hover:text-accent ${pathname === "/products" ? "bg-accent-foreground text-accent" : ""}`}>
                          <Link href="/products">Products</Link>
                        </li>
                        <li className={`sidebarItem hover:bg-accent-foreground hover:text-accent ${pathname === "/categories" ? "bg-accent-foreground text-accent" : ""}`}>
                          <Link href="/categories">Categories</Link>
                        </li>
                        <li className={`sidebarItem hover:bg-accent-foreground hover:text-accent ${pathname === "/brands" ? "bg-accent-foreground text-accent" : ""}`}>
                          <Link href="/brands">Brands</Link>
                        </li>

                      </ul>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
              </div>
              {/*  end */}
              <div className='flex h-6 items-center space-x-2 text-sm justify-evenly  '>
                <DropdownMenu>
                  <DropdownMenuTrigger className='outline-0 border-0'>
                    <RiUserLine size={25} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    {session.status == "authenticated" ?
                      <>
                        <Link href="/profile">
                          <DropdownMenuItem>
                            Profile
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem onClick={() => signOut(
                            {callbackUrl:"/login"}
                        )}>Logout</DropdownMenuItem>
                      </> :
                      <>
                        <Link href="/login">
                          <DropdownMenuItem>
                            Login
                          </DropdownMenuItem>
                        </Link>
                        <Link href="/register">
                          <DropdownMenuItem>
                            Register
                          </DropdownMenuItem>
                        </Link>
                      </>}



                  </DropdownMenuContent>
                </DropdownMenu>
                {session.status == "authenticated" && <>
                  <Separator orientation="vertical" className='bg-sidebar-accent-foreground  ' />
                  <Link href="/cart">
                    <div className="p-3 relative">
                      <IoCartOutline size={30} />
                      <Badge className="h-4 min-w-4 rounded-full px-1 font-mono tabular-nums absolute top-1.5 right-1.5" variant="default">
                        {CartItem?.numOfCartItems ?? <LoaderCircle className="animate-spin" />}
                      </Badge>
                    </div>
                  </Link>
                  <Separator orientation="vertical" className='bg-sidebar-accent-foreground ' />
                  <Link href="/wishlist">
                    <FaRegHeart size={25} />
                  </Link>
                </>}
                <Separator orientation="vertical" className='bg-sidebar-accent-foreground' />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="border-0 outline-0 p-0">
                    <Button variant="link" size="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                      </svg>

                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute  scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                      </svg>

                      <span className="sr-only">Toggle theme</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      System
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>


              </div>


            </div>
          </div>

        </nav>





      </div>

    </>
  )
}
