"use server"
import { decode } from "next-auth/jwt";

import { cookies } from "next/headers";


export default async function getUserToken(){
    const sec = await (await cookies()).get('next-auth.session-token')?.value;
    const myToken =await decode({token:sec,secret:process.env.NEXTAUTH_SECRET!});
    return myToken?.token;
} 