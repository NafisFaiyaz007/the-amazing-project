import React from 'react';
import Navbar from '../components/Navbar';
import DragDrop from '../components/DragDrop';
import Viewer from '../components/FileViewer';


const Account = () => {
  

  return (
    <div className="min-h-screen p-10 flex flex-col text-white">
      <Navbar />

      {/* right half of the aaccount screen that is being used to show the drive files of the user */}
      <div className="float-root ">
        <div className="grid grid-cols-2 gap-4 ">
          <h1 className=" text-center text-l md:text-l lg:text-2xl text-white p-5">
            Import from drive
            {/* <App /> */}
            <DragDrop />
          </h1>

          <div className="text-center text-l md:text-l lg:text-2xl text-white p-5 float-right">
            <h1>view file</h1>
            {/* <App/> */}
          </div>
        </div>
      </div>
      {/* views the file on the page */}
      <Viewer /> 
    </div>
  );
};

export default Account;
