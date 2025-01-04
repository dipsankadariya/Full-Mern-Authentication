import React from 'react';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
function Profile() {
  const fileRef= useRef(null);
  const { currentUser } = useSelector((state) => state.user);

  return (
   
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="font-bold text-3xl text-center my-8">Profile</h1>
      <form className="flex flex-col gap-4">
        <input type='file' ref={fileRef} hidden accept='image/*'/>
        <div className="flex justify-center mb-4">
          <img
            src={currentUser.profilePicture || '/default-avatar.png'}
            alt="Profile"
            className="h-24 w-24 cursor-pointer rounded-full object-cover"
            onClick={()=>fileRef.current.click()}
          />
        </div>
        <input
          defaultValue={currentUser.username}
          type="text"
          id="username"
          placeholder="Username"
          className="bg-gray-200 rounded-lg p-3 text-left text-lg"
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="Email"
          className="bg-gray-200 rounded-lg p-3 text-left text-lg"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-gray-200 rounded-lg p-3 text-left text-lg"
        />
        <button
          type="submit"
          className="bg-black py-3 text-white text-lg hover:opacity-70"
        >
          Update
        </button>
      </form>
      <div className="flex justify-between mt-6 text-lg">
        <button className="text-red-500 font-bold hover:opacity-70">
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
