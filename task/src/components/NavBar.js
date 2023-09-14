import React from 'react'
import { Link } from 'react-router-dom'
import {useLogout} from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const NavBar = () => {
  const {logout}=useLogout()
  const {user}=useAuthContext()

  const handleClick=()=>{
    logout()
  }

  return (
    <header className='p-4 bg-gray-400'>
        <div className='flex items-center w-full justify-between'>
            <Link to='/'>
                <h1 className='text-3xl font-bold no-underline'>Task Management App</h1>
            </Link>
            <nav className='flex items-center justify-between'>
              {user && (<div>
                <span className='px-4 text-md font-bold text-white'>User ID: {user.email}</span>
                <button onClick={handleClick} className='text-md font-bold no-underline text-red-600'>Logout</button>
              </div>)}
              <div >
                <Link to='/login' className='mx-4 cursor-pointer text-md font-semibold text-black'>Login</Link>
                <Link to='/register' className='mx-4 cursor-pointer text-md font-semibold text-black'>Register</Link>
              </div>
            </nav>
        </div>
        </header>
  )
}

export default NavBar