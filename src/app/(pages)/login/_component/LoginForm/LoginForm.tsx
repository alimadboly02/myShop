
"use client"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { Spinner } from "@/components/ui/spinner"
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
import { zodResolver } from "@hookform/resolvers/zod"
import { sign } from "crypto"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { useParams, useSearchParams } from "next/navigation"
 
const formSchema = z.object({
  email: z.email({
    message: "Please enter a valid email address.",
  }).min(1, {
    message: "Email is required.",
  }).regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, {
    message: "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
  }),
})
export default function LoginForm() {
  const errorMessage = useSearchParams()
  const callbackUrl = useSearchParams().get("callback_url") ?? "/"


  console.log("🚀 ~ LoginForm ~ errorMessage:", errorMessage);
  console.log("🚀 ~ LoginForm ~ callbackUrl:", callbackUrl);
  
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const [loading, setLoading] = useState<boolean>(false)
    async function onSubmit(values: z.infer<typeof formSchema>) {
      setLoading(true)
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const response= await signIn("credentials",{
      email: values.email,
      password: values.password,
      redirect: true,
      callbackUrl: callbackUrl,
    })
      
        setLoading(false)
    console.log(values)
  }
  return (
    <>
     <Form {...form}>
      
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-sm">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
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
                <Input type="password" placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="text-red-500 text-sm">{errorMessage.get("error")}</p>
        <Button type="submit" disabled={loading}>
          {loading ? <Spinner /> : "Submit"}
        </Button>
      </form>
    </Form>
    
    
    </>
  )
}

