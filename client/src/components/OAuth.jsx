import React from 'react';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async () => {  
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
    
            const response = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
            });
          

            const data = await response.json();
            dispatch(signInSuccess(data));
            navigate('/');
        } catch (error) {
            console.log("Couldn't log in with Google", error);
        }
    };

    return (
        <button 
            type='button' 
            onClick={handleGoogleClick} 
            className='bg-blue-500 py-3 text-white text-lg hover:opacity-70 disabled:opacity-40'
        >
            CONTINUE WITH GOOGLE
        </button>
    );
}

export default OAuth;
