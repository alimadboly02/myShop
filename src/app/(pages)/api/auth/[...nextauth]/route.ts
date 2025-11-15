import { authOption } from "@/auth";
import { LoginFailResponse, LoginSuccessResponse } from "@/interfaces";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth( authOption)

export { handler as GET, handler as POST }