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
    <div className="flex justify-between bg-opacity-10 w-full p-4">
      <h1 className="text-center uppercase text-l md:text-l lg:text-2xl text-white p-5">
        Welcome, {user?.displayName} 
      </h1>
      {user?.displayName ? (
        <button
          className="rounded-full text-black uppercase cursor-pointer  hover:opacity-75 duration-150 bg-primary md:text-s lg:text-xl text-white text-center py-2 px-5 mt-0"
          onClick={handleSignOut}
        >
          Log out
        </button>
      ) : (
        <Link to="/signin"></Link>
      )}
    </div>
  );
};

export default Navbar;
