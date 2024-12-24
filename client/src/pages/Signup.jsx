import React from 'react'

function Signup() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='font-bold text-3xl text-center my-8'>Sign Up</h1>
      <form className='flex flex-col gap-4'>
        <input 
        type='text' 
        placeholder='Username'
        id='username'
        className='bg-gray-200 rounded-lg p-3 text-left text-lg'
        />
          <input 
        type='text' 
        placeholder='Email'
        id='email'
        className='bg-gray-200 rounded-lg p-3 text-left text-lg'
        />
          <input 
        type='text' 
        placeholder='Password'
        id='password'
        className='bg-gray-200 rounded-lg p-3 text-left text-lg'
        />
        <button type='submit'className='bg-black py-3 text-white text-lg hover:bg-gray-800'>Sign Up</button>
       </form>
    </div>
  )
}

export default Signup