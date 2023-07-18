import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <header>
        <div className='header-container'>
            <Link to='/'>
                <h1>Task Management App</h1>
            </Link>
            <nav>
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