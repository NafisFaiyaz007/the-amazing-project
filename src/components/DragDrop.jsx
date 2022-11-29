import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

import "./DragDrop.css";

const fileTypes = ["JPG","DOCX","PDF"];

export default function DragDrop() {
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };
  return (
    <div className="DragDrop text-center text-l md:text-l lg:text-2xl text-white p-auto">
      {/* <h1>Hello To Drag & Drop Files</h1> */}
      <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
      <p className="text-xs mt-5">
        {file ? `File name: ${file.name}` : "no files uploaded yet"}
      </p>
      <p className="text-xs mt-5 md:px-auto">*Encrypt and store in drive</p>
      <p className="text-xs mt-1 mb-5">*Decrypt and view</p>

      <button
        className='bg-primary text-black rounded-full md:text-s lg:text-xl py-4 px-6 md:px-auto m-4 lg:py-2 lg:px-auto 
          font-bold uppercase cursor-pointer hover:opacity-75 duration-150" /> '
      >
        {"Encrypt"}
      </button>
      <button
        className='bg-secondary  rounded-full md:text-s lg:text-xl text-black py-4 px-6 m-4 md:px-auto lg:py-2 lg:px-auto
          font-bold uppercase cursor-pointer hover:opacity-75 duration-150" /> '
      >
        {"Decrypt"}
      </button>
    </div>
  );
}
// "rounded-full bg-secondary md:text-s lg:text-xl text-black text-center py-2 px-5 mt-0 ml-10"