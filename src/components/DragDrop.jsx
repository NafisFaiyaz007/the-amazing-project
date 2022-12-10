import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import axios from 'axios';
// import PDFViewer from 'pdf-viewer-reactjs'
import "./DragDrop.css";
// Import Worker
import { Worker } from '@react-pdf-viewer/core';
// Import the main Viewer component
import { Viewer } from '@react-pdf-viewer/core';
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
// default layout plugin
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// Import styles of default layout plugin
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import Modal from 'react-modal';
import FileViewer from 'react-file-viewer';

const fileTypes = ["JPG","JPEG","DOCX","PDF", "txt"];

export default function DragDrop() {
  const [file, setFile] = useState();
  const [openEx, setOpenEx] = useState(null);
  const [pdfFile, setPdfFile] = useState();
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [img, setImg] = useState(null);
  const [doc, setDoc] = useState(null);
  const [isDecrypted, setIsDecrypted] = useState(null);

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  var filename = null;
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '50%',
      maxHeight: '95%'
    },
  };
  function openModal(file) {
    console.log("open modal")
    itemOpenHandler(file)
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
    setFile('')
    setPdfFile('')
    setImg('')
    setDoc('')
    const data = new FormData() 
    data.append('file', filename)
    axios.delete(`http://localhost:8080/delete/${file.name}`, { // receive two parameter endpoint url ,form data 
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    //   "credentials": "true",
    // }
  })
  .then(res => { // then print response status
    console.log(res.statusText)
  })
  }
  
  const handleChange = (file) => {
    setFile(file);
    console.log(file)
    console.log(file.name)
    filename  = file.name
    console.log(`The name of the file is ${filename}.`)
    console.log(file.name.split('.').pop() )
    // let reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onloadend=(e)=>{
    //   //setPdfError('');
    //   setPdfFile(e.target.result);}
    
    };
    
    // function onDocumentLoadSuccess({ numPages }) {
    //   setNumPages(numPages);
    // }
    const handleEncryption = (file) => {

    const data = new FormData() 
    data.append('file', file)
    console.log("here")
    axios.post("http://localhost:8080/upload", data, { // receive two parameter endpoint url ,form data 
      headers: {
      "Access-Control-Allow-Origin": "*",
      "credentials": "true",
    }    
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
    headers: {
      "Access-Control-Allow-Origin": "*",
    }
  })
  .then(res => { // then print response status
    console.log(res.statusText)
  })
  axios.get(`http://localhost:8080/update/${file.name}`, { // receive two parameter endpoint url ,form data 
    })
    .then(res => { // then print response status
      console.log(res.statusText)
      setFile(res.data)
    })
  itemOpenHandler(file)
  }
  const itemOpenHandler = (file) => {
    setOpenEx(file.name.split('.')[1]);
    if (file.name.split('.').pop() === 'pdf') {

        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend=(e)=>{
          //setPdfError('');
          setPdfFile(e.target.result);}
          // setFile('')
          console.log("itemOpen hanler")
    }
    else if (file.name.split('.').pop() === 'jpg'){
      setImg(file)
    }
    else {
      setDoc(file)
    }

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
      
      
         {/* style={{marginTop: '2rem', marginBottom: '5rem'}}> */}
        <button onClick={() => openModal(file)} className='bg-secondary  rounded-full md:text-s lg:text-xl text-black py-4 px-6  md:px-auto lg:py-2 lg:px-auto
          font-bold uppercase cursor-pointer hover:opacity-75 duration-150"/>'>View File</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
        
        <div style={{overflow: 'hidden', maxHeight: '20%'}}>

        {pdfFile&&(
          
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.1.81/build/pdf.worker.min.js">
    <Viewer fileUrl={pdfFile}
    plugins={[defaultLayoutPluginInstance]}></Viewer>
  </Worker>
)}      

</div>
{img&&
      <div >
          {
              img &&
              <div>
                  <img src={window.URL.createObjectURL(img)} alt=""/>
              </div>
          }
      </div>}
      {
                doc &&
                <FileViewer
                    fileType={openEx}
                    filePath={window.URL.createObjectURL(doc)}
                />
            }


      </Modal>
    </div>
  );
}
