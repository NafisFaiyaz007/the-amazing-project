import React, { useEffect } from 'react';
import { GoogleButton } from 'react-google-button';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate('/camera');
    }
  }, [navigate, user]);

  return (
    <div className="w-auto min-h-screen m-auto text-center">
      <h1 className="text-center text-3xl font-white text-white mb-8 py-8">
        please sign in
      </h1>
      <div className="max-w-[240px] m-auto py-4 r">
        <GoogleButton onClick={handleGoogleSignIn} />
      </div>
    </div>
  );
};

export default Signin;
