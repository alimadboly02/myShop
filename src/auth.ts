import { LoginFailResponse, LoginSuccessResponse } from "@/interfaces";
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

 export const authOption : AuthOptions ={
    providers:[
        CredentialsProvider({
            name: "Credentials",
            credentials:{
                email:{label:"Email", type:"email",placeholder:"Enter your email"},
                password:{label:"Password", type:"password",placeholder:"Enter your password"}
            },
            authorize: async (credentials)=>{
                const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin",{
                    method:"POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    }),
                })
                const payload : LoginSuccessResponse | LoginFailResponse = await response.json();
                if ("user" in payload) {
                    return {
                        id:payload.user.email,
                        token:payload.token,
                        user: payload.user
                    };
                } else {
                    throw new Error(payload.message)
                }
                
            }
        })

    ],
    callbacks:{
        jwt:({token,user})=>{
            if(user){
                token.user= user.user;
                token.token= user.token;
            }
            return token
        },
        session:({token,session})=> {
            if(token.user){
                session.user = token.user;
            }
            return session
        },
    },pages:{
        signIn: "/login",
        error: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
}