import React from 'react';
import { UserAuth } from '../context/AuthContext';
// import { Link } from "react-router-dom";
import App from "../context/Drive";
import Navbar from '../components/Navbar';
// import encrypt  from "../enc_dec";

const Account = () => {
  // const { logOut, user } = UserAuth();

  // const handleSignOut = async () => {
  //   try {
  //     await logOut();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="min-h-screen pt-5 flex flex-col text-white">
      <Navbar />

      {/* right half of the aaccount screen that is being used to show the drive files of the user */}
      <div className="float-root ">
        <div className="grid grid-cols-2 gap-4 ">
          <h1 className="p text-center text-l md:text-l lg:text-2xl text-white p-5">
            Import from drive
            <App />
          </h1>

          <div className="text-center text-l md:text-l lg:text-2xl text-white p-5 float-right">
            <h1>view file</h1>
          </div>
        </div>
      </div>

      {/* <div className="w-auto min-h-10 m-auto left-0 top-0">
        <h1 className="text-s md:text-l lg:text-xl text-white p-5 ">
          Accounts
        </h1>
      </div>

      <div className="w-auto min-h-10 m-auto right-0 top-0">
        <button
          onClick={handleSignOut}
          className=" bg-primary rounded-full md:text-s text-s lg:text-xl text-center border py-2 px-2 mt-0"
        >
          Log out
        </button>
      </div> */}

      {/* <div>
        <p className=" text-center text-l md:text-l lg:text-2xl text-white p-5">
          Welcome, {user?.displayName}
        </p>
      </div> */}
    </div>
  );
};

export default Account;
