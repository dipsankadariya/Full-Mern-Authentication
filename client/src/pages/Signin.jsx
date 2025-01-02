import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInStart, signInFailure, signInSuccess } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth';

function Signin() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        dispatch(signInFailure(data.message || 'Invalid credentials'));
        return;
      }

      dispatch(signInSuccess(data));
      navigate('/');
    } catch (err) {
      dispatch(signInFailure('Something went wrong. Please try again.'));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="font-bold text-3xl text-center my-8">Sign In</h1>
      {error && <p className="text-red-400 text-lg mt-4">{error}</p>}
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
        <button
          type="submit"
          disabled={loading}
          className="bg-black py-3 text-white text-lg hover:opacity-70 disabled:opacity-40"
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth></OAuth>
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
