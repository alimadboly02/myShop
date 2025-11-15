import React from 'react'
import LoginForm from './_component/LoginForm/LoginForm'
import { Card } from '@/components/ui/card'

function Login() {
  return (
    <>
    <div className='flex flex-col items-center justify-center gap-7 min-h-[80vh]'>
      <h1 className='text-3xl font-bold'>Welcome Back to My Shop✋</h1>

<Card className='p-7'>
  <LoginForm/>
  
</Card>
    </div>
    
    
    
    </>
  )
}

export default Login
