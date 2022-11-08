import React from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex justify-between bg-opacity-10 w-full p-4'>
      <h1 className='text-center text-2xl font-bold'>   
      
      </h1>
      {user?.displayName ? (
        <button className="rounded-full text-xl " onClick={handleSignOut}>Logout</button>
      ) : (
        <Link to='/signin'></Link>
      )}
    </div>
  );
};

export default Navbar;
