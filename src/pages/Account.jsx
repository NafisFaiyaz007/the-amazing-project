import React from 'react';
// import { UserAuth } from '../context/AuthContext';
// import { Link } from "react-router-dom";
// import App from "../context/Drive";
import Navbar from '../components/Navbar';
import DragDrop from '../components/DragDrop';
// import App from '../components/FileViewer';
import Viewer from '../components/FileViewer';
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
            {/* <App /> */}
            <DragDrop/>
          </h1>

          <div className="text-center text-l md:text-l lg:text-2xl text-white p-5 float-right">
            <h1>view file</h1>
            {/* <App/> */}
            <Viewer/>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Account;
