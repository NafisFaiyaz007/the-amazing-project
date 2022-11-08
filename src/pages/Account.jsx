import React from 'react';
import { UserAuth } from '../context/AuthContext';

const Account = () => {
  const { logOut, user } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[300px] m-auto text-center">
      <h1 className="text-xl md:text-2xl lg:text-4xl text-white p-20 ">
        Account
      </h1>

      <div>
        <p className='className=" text-center text-l md:text-l lg:text-2xl text-white p-5'>
          Welcome, {user?.displayName}
        </p>
      </div>
      <button
        onClick={handleSignOut}
        className=" bg-primary rounded-full text-xl text-center border py-2 px-5 mt-10"
      >
        Log out
      </button>
    </div>
  );
};

export default Account;
