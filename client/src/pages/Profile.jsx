import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserFailure, updateUserSucess, updateUserStart } from '../redux/user/userSlice';
import { deleteUserStart,deleteUserFailure,deleteUserSucess } from '../redux/user/userSlice';
function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      dispatch(updateUserStart());
      const response = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success === false) {
        setError(data.message || 'Failed to update user.');
        dispatch(updateUserFailure(data));
      } else {
        dispatch(updateUserSucess(data));
        setSuccess(true);
      }
    } catch (error) {
      setError('Something went wrong.');
      dispatch(updateUserFailure(error));
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteAccount= async()=>{
  try{
    dispatch(deleteUserStart());
    const response = await fetch(`/api/user/delete/${currentUser._id}`, {
      method: 'DELETE',
  });
  const data = await response.json();
  if(data.success===false){
    dispatch(deleteUserFailure());
    return;
  }
  dispatch(deleteUserSucess());
}
  catch(error){
    dispatch(deleteUserFailure());
  }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="font-bold text-3xl text-center my-8">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="file" ref={fileRef} hidden accept="image/*" />
        <div className="flex justify-center mb-4">
          <img
            src={currentUser.profilePicture || '/default-avatar.png'}
            alt="Profile"
            className="h-24 w-24 cursor-pointer rounded-full object-cover"
            onClick={() => fileRef.current.click()}
          />
        </div>
        <input
          defaultValue={currentUser.username}
          type="text"
          id="username"
          placeholder="Username"
          className="bg-gray-200 rounded-lg p-3 text-left text-lg"
          onChange={handleChange}
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="Email"
          className="bg-gray-200 rounded-lg p-3 text-left text-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Update Password"
          className="bg-gray-200 rounded-lg p-3 text-left text-lg"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-black py-3 text-white text-lg hover:opacity-70"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update'}
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">Profile updated successfully!</p>}
      <div className="flex justify-between mt-6 text-lg">
        <button onClick={handleDeleteAccount} className="text-red-500 font-bold hover:opacity-70">
          Delete Account
        </button>
        <button className="text-blue-500 font-bold hover:opacity-70">
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Profile;
