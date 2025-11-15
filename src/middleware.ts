import { getToken } from "next-auth/jwt";

import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/cart","/profile","/orders","/wishlist"];
const authPage=['/login','/register']
 export default async function middleware(req : NextRequest) {
    const token =await getToken({req});
    if(protectedRoutes.includes(req.nextUrl.pathname)){
        if(token){
            return NextResponse.next();
        }else{
            const redirectUrl =new URL('/login',process.env.NEXT_URL);
            redirectUrl.searchParams.set('callback_url',req.nextUrl.pathname);
            return NextResponse.redirect(redirectUrl);
        }
    }
    
      if(authPage.includes(req.nextUrl.pathname)){
        if(!token){
            return NextResponse.next();
        }else{
            const redirectUrl =new URL('/',process.env.NEXT_URL)
            return NextResponse.redirect(redirectUrl);
        }
    }
    ;
   
    return NextResponse.next();
    
 }