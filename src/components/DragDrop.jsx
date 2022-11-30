import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import {Buffer} from 'buffer';
import axios from 'axios';
// import PDFViewer from 'pdf-viewer-reactjs'
import "./DragDrop.css";
import Encrypt from "../context/encrypt";

const fileTypes = ["JPG","JPEG","DOCX","PDF", "txt"];

export default function DragDrop() {
  const [file, setFile] = useState();
  const [isFileSelected, setIsFileSelected] = useState(false)

  const handleChange = (file) => {
    setFile(file);
    setIsFileSelected(true)
    console.log(file.name)

    // setFile = Encrypt(file);
    // console.log("File Encrypted")
  };
  
  const handleEncryption = (file) => {
    // if (!file){
    //   return console.log("File not selected")
    // }
    // console.log( file)
    // let reader = new FileReader();
    
    // reader.readAsText(file);
    
    // reader.onload = function() {
    //   // var content = Buffer.from(reader.result)
    //   console.log(reader.result);
    //   window.Encrypt(reader.result)
    // };
    
    // reader.onerror = function() {
    //     console.log(reader.error);
    //   };
      
    //   // console.log(content)
    //   // Encrypt(content);
    // console.log("File Encrypted")
    const data = new FormData() 
    data.append('file', file)
    console.log("here")
    axios.post("http://localhost:8080/upload", data, { // receive two parameter endpoint url ,form data 
      })
      .then(res => { // then print response status
        console.log(res.statusText)
      })
      console.log("posted")
  }
  const handleDecryption = (file) => {
    const data = new FormData() 
    data.append('file', file)
    axios.post("http://localhost:8080/decrypt", data, { // receive two parameter endpoint url ,form data 
  })
  .then(res => { // then print response status
    console.log(res.statusText)
  })
  }
      return (
  <div className="DragDrop text-center text-l md:text-l lg:text-2xl text-white p-auto">
      {/* <h1>Hello To Drag & Drop Files</h1> */}
      <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
      <p className="text-xs mt-5">
        {file ? `File name: ${file.name}` : "no files uploaded yet"}
      </p>

      <p className="text-xs mt-5">*Encrypt and store in drive</p>
      <p className="text-xs mt-1 mb-5">*Decrypt and view</p>

      <button onClick={() => handleEncryption(file)}
        className='bg-primary text-black rounded-full md:text-s lg:text-xl py-4 px-6 md:px-auto mb-4 mr-4 lg:py-2 lg:px-auto 
          font-bold uppercase cursor-pointer hover:opacity-75 duration-150" /> '
      >
        Encrypt
      </button> 

      <button onClick={() => handleDecryption(file)}
        className='bg-secondary  rounded-full md:text-s lg:text-xl text-black py-4 px-6  md:px-auto lg:py-2 lg:px-auto
          font-bold uppercase cursor-pointer hover:opacity-75 duration-150" /> '
      >
        Decrypt
      </button>
      
    </div>
  );
}
// "rounded-full bg-secondary md:text-s lg:text-xl text-black text-center py-2 px-5 mt-0 ml-10"