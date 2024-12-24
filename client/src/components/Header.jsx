import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
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
          <Link to="/sign-up" className="hover:underline">
            <li className="transition-all">SignUp</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Header;
