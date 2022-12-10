import React from 'react';
import Navbar from '../components/Navbar';
import DragDrop from '../components/DragDrop';
import Viewer from '../components/FileViewer';

// import DrivePicker from '../context/Drive';
//import {HandleClientLoad} from '../context/drivesource';
import { signIn } from "../gdrive/utils";

let CLIENT_ID =
  "572807278348-7nc0l5ht18q9ckcnrfu17c5dhk4cn9l5.apps.googleusercontent.com";
let REDIRECT_URI = "http://127.0.0.1:5500/src/gdrive/profile.html";
let SCOPES = "https://www.googleapis.com/auth/drive";

function sign() {
  
  signIn(CLIENT_ID, REDIRECT_URI, SCOPES);
}

const Account = () => {
  
  return (
    <div className="min-h-screen p-10 flex flex-col text-white">
      <Navbar />

      {/* right half of the aaccount screen that is being used to show the drive files of the user */}
      <div className="float-root ">
        <div className="grid grid-cols-2 gap-4 ">
          <h1 className=" text-center text-l md:text-l lg:text-2xl text-white p-10">
            Drop down the file in the box
            {/* <App /> */}
            <DragDrop />
          </h1>

          <div className="text-center text-l md:text-l lg:text-2xl text-white p-5 float-right">
            <h1 className="text-center text-l md:text-l lg:text-2xl text-white p-5">
              Download files from drive
            </h1>

            {/* <DrivePicker/> */}
            <button
              
             onClick={() => sign()} className='bg-primary text-black rounded-full md:text-s lg:text-xl py-4 px-6 md:px-auto mb-4 mr-4 lg:py-2 lg:px-auto 
          font-bold uppercase cursor-pointer hover:opacity-75 duration-150" /> '
            >
              Go to Drive
            </button>

            {/* <button
              className='bg-secondary  rounded-full md:text-s lg:text-xl text-black py-4 px-6  md:px-auto lg:py-2 lg:px-auto
          font-bold uppercase cursor-pointer hover:opacity-75 duration-150" /> '
            >
              button 2
            </button> */}
          </div>
        </div>
      </div>
      {/* views the file on the page */}
      <Viewer />
    </div>
  );
};

export default Account;
