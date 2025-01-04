import React from 'react';

export default function Home() {
  return (
    <div className='px-4 py-12 max-w-2xl mx-auto'>
      <h1 className='text-3xl font-bold mb-4 text-slate-800'>Home</h1>
      <h2 className='text-xl font-bold mb-4 text-slate-800'>Try out the Authentication through the signin Page</h2>
      <p className='mb-4 text-slate-700'>
        This application is built with the MERN stack (MongoDB, Express, React, Node.js) and provides secure authentication. Users can sign up, sign in, update their profile, log out, and delete their account. Sessions are managed using JWT tokens stored in secure, HTTP-only cookies. Google OAuth is also integrated for easy sign-in with Google accounts.
      </p>
      <p className='mb-4 text-slate-700'>
        Key Features:
        <ul className="list-disc pl-5 mt-2">
        <li>User sign-up and sign-in functionality</li>
          <li>Google OAuth integration for seamless sign-in</li>
          <li>User profile page</li>
          <li>Ability to update username, password, and email</li>
          <li>JWT authentication and session management via cookies</li>
          <li>Ability to delete user account</li>
          <li>Sign-out functionality</li>
          <li>Protected routes for authenticated users</li>
          <li>Password hashing with bcrypt</li>
        </ul>
      </p>
      <p className='mb-4 text-slate-700'>
        Tech stack:
        <ul className="list-disc pl-5 mt-2">
          <li>MongoDB, Express, React, Node.js (MERN)</li>
          <li>JWT for authentication</li>
          <li>bcrypt for password hashing</li>
          <li>Cookies for session management</li>
          <li>Google OAuth for authentication</li>
          <li>Tailwind Css for styling</li>
        </ul>
      </p>
    </div>
  );
}
