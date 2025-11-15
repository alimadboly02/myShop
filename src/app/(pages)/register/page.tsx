import React from 'react'
import { RegisterForm } from './_Component/registerForm/RegisterForm'


export default function Register() {
  return (
   <>
      <div>Register</div>
      <div className='min-h-[60vh] flex flex-col justify-center items-center gap-7'>
        <h1 className='text-3xl font-bold'>Register</h1>
        <RegisterForm/>
        </div>
   </>
  )
}
