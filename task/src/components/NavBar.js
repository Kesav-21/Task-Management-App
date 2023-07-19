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
    <header>
        <div className='header-container'>
            <Link to='/'>
                <h1>Task Management App</h1>
            </Link>
            <nav>
              {user && (<div>
                <span>{user.email}</span>
                <button onClick={handleClick}>LOGOUT</button>
              </div>)}
              <div>
                <Link to='/login'>Login</Link>
                <Link to='/register'>Register</Link>
              </div>
            </nav>
        </div>
        </header>
  )
}

export default NavBar