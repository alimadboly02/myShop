"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { email, z } from "zod"
import { Spinner } from "@/components/ui/spinner"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useState } from "react"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.email({
    message: "Invalid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  rePassword: z.string().min(8, {
    message: "Re-enter password must be at least 8 characters.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  }).refine((data) => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"], // path of error
  })


export function RegisterForm() {
    const [Loading, setLoading] = useState(false)
    const router = useRouter()
    type formValues = z.infer<typeof formSchema>
 const form = useForm<formValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  })
    async function onSubmit(values: formValues ) {
        const data ={
    name: values.username,
    email:values.email,
    password:values.password,
    rePassword:values.rePassword,
    phone:values.phone
}
      try {
        setLoading(true)
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          }
        })
      const payload = await res.json()
      if (res.ok) {
        console.log("Register success")
        router.push("/login")
      } else {
        console.log("Register failed")
      }
    } catch (error) {
        console.log(error)
      }
        setLoading(false)
    
  }

  return (
   <Card className="w-[400px] px-6 py-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="enter your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RePassword</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="enter your re-password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button  disabled={Loading} type="submit"> {Loading ? <Spinner /> : "Submit"}</Button>
          </form>
        </Form>
   </Card>
  )
}