import React from 'react';

export default function About() {
  return (
    <div className="px-6 py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center text-slate-800">About</h1>
      <p className="text-lg text-slate-700 mb-4">
        Welcome to Mern Authentication application! This project is built with the MERN stack (MongoDB, Express, React, Node.js) and provides a secure platform for users to manage their profiles, update account information, and more.
      </p>
      <p className="text-lg text-slate-700 mb-4">
      This  project has integrated Google OAuth for a seamless sign-in experience, and users can manage their profiles, update personal details, and even delete their accounts if needed.
      </p>
      <p className="text-lg text-slate-700 mb-4">
        The application uses JWT (JSON Web Tokens) for secure authentication and session management through cookies, ensuring that your account remains protected.
      </p>
      <p className="text-lg text-slate-700">
        Thank you for using it ! Feel free to explore the features, and let me know if you have any questions.
      </p>
    </div>
  );
}
