import React from 'react';
import { Link } from 'react-router-dom';
import {useSelector}  from  'react-redux';
function Header() {
  const {currentUser} = useSelector((state)=>state.user);

  return (
    <div className=" text-black">
      <div className="flex justify-between items-center max-w-6xl mx-auto py-6 px-3">
        <h1 className="font-semibold text-Black text-lg">
          MERN Auth Boilerplate
        </h1>
        <ul className="flex gap-6 text-lg">
          <Link to="/" className="hover:underline">
            <li className="transition-all">Home</li>
          </Link>
          <Link to="/about" className="hover:underline">
            <li className="transition-all">About</li>
          </Link>
          
          <Link to="/profile" className="hover:underline">
          {currentUser? (
            <img src={currentUser.profilePicture}alt='profile' className=' h-7 w-7 rounded-full object-cover'></img>
          ):(
   <li className="transition-all">Sign In</li>
          )}
            
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Header;
