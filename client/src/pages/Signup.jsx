import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';


function Signup() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
   
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok && data.success) {
        
        setSuccess(true);
        setFormData({});
        setError(''); 
      
      } else {
       
        setSuccess(false);
        setError(data.message || 'Something went wrong. Please try again.');
      }
      navigate('/sign-in');
    } catch (err) {
      setLoading(false);
      setSuccess(false);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="font-bold text-3xl text-center my-8">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          value={formData.username || ''}
          className="bg-gray-200 rounded-lg p-3 text-left text-lg"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Email"
          id="email"
          value={formData.email || ''}
          className="bg-gray-200 rounded-lg p-3 text-left text-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={formData.password || ''}
          className="bg-gray-200 rounded-lg p-3 text-left text-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-black py-3 text-white text-lg hover:opacity-70 disabled:opacity-40"
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth></OAuth>
      </form>
      <div className="flex gap-2 mt-4 text-lg">
        <p>
          Have an account?
          <Link to="/sign-in">
            <span className="font-bold px-3">Sign In</span>
          </Link>
        </p>
      </div>
      {error && (
        <p className="text-red-400 text-lg mt-4">
          {error}
        </p>
      )}
      {success && (
        <p className="text-green-400 text-lg mt-4">
          Signup successful! You can now <Link to="/sign-in">Sign In</Link>.
        </p>
      )}
    </div>
  );
}

export default Signup;
