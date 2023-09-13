import React, { useState } from 'react'
import { useLogin } from '../hooks/useLogin'

const Login = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const {login,error,isLoading}=useLogin()

    const handleSubmit=async(e)=>{
        e.preventDefault();
        await login(email,password)
    }

  return (
    <div className='border-4 w-2/5 rounded-2xl mx-auto mt-32 from-white-900 bg-gradient-to-b shadow-2xl'>
    <form onSubmit={handleSubmit}>
        <h3 className='text-3xl font-bold text-center my-3 text-red-800'>Login</h3>
        <div className='flex flex-col w-2/4 mx-auto my-3'>
        <label className='font-semibold mb-2 text-md'>Email:</label>
        <input type="email" onChange={(e)=>setEmail(e.target.value)}
        value={email} className='rounded-lg text-gray-900 p-2 border-2 border-slate-300 focus:outline-none focus:border-sky-500 focus:invalid:border-red-500 focus:invalid:ring-red-600' placeholder="Email"
        />
        </div>
        <div className='flex flex-col w-2/4 mx-auto my-3'>
        <label className='font-semibold mb-2 text-md'>Password:</label>
        <input type="password" onChange={(e)=>setPassword(e.target.value)}
        value={password}
        className='rounded-lg text-gray-900 p-2 border-2 border-slate-300 focus:outline-none focus:border-sky-500' placeholder='Password'
        />
        </div>
        <div className='flex flex-col w-2/4 mx-auto my-5'>
        <button disabled={isLoading} className='p-3 mx-auto w-3/4 rounded-xl bg-amber-200 hover:bg-amber-500 mb-3'>Login</button>
        {error && <div className='text-red-700 text-center font-semibold'>*{error}</div>}
        </div>
    </form>
    </div>
  )
}

export default Login;