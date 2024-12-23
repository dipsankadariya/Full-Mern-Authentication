import React from 'react';
import {Link} from 'react-router-dom'

function Header() {
  return (
    <div className='bg-blue-800 py-4 px-4'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <h1 className='font-bold text-white'>Mern Authentication Boiler Plate</h1>
            <ul className='flex gap-4 text-white'>
             <Link to='/'> <li>Home</li></Link>  
             <Link to='/about'> <li>About</li></Link>  
             <Link to='/sign-in'> <li>SignIn</li></Link>  
             
            </ul>
        </div>
    </div>
  )
}

export default Header