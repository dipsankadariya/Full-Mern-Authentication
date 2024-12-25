import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signin() {
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        setMessage(data.message || 'Invalid credentials');
        setTimeout(() => setMessage(''), 4000);
        return;
      }
      navigate('/');
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
      setTimeout(() => setMessage(''), 4000);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="font-bold text-3xl text-center my-8">Sign In</h1>
      {message && <p className="text-red-500 text-center mb-4">{message}</p>}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          id="email"
          value={formData.email || ''}
          onChange={handleChange}
          className="bg-gray-200 rounded-lg p-3 text-left text-lg"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={formData.password || ''}
          onChange={handleChange}
          className="bg-gray-200 rounded-lg p-3 text-left text-lg"
        />
        <button type="submit" className="bg-black py-3 text-white text-lg hover:opacity-70">
          Sign In
        </button>
      </form>
      <div className="flex gap-2 mt-4 text-lg">
        <p>
          Don't have an account?
          <Link to="/sign-up">
            <span className="font-bold px-3">Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signin;
