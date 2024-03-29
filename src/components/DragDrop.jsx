import { useState, useEffect } from "react";
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
import { Button } from 'antd'

// import 'file-api/File';
const fileTypes = ["JPG", "JPEG", "DOCX", "PDF", "txt"];

export default function DragDrop() {
  const [file, setFile] = useState([]);
  const [openEx, setOpenEx] = useState(null);
  const [pdfFile, setPdfFile] = useState();
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [img, setImg] = useState(null);
  const [doc, setDoc] = useState(null);
  const [allowDelete, setAllowDelete] = useState(null);

  const queryParameters = new URLSearchParams(window.location.href)
  let ACCESS_TOKEN = queryParameters.get("access_token")
  console.log(ACCESS_TOKEN)

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
  }

  const handleChange = (file) => {
    setFile(file);
    filename = file.name
    console.log(`The name of the file is ${filename}.`)
  };


  async function handleEncryption(file) {
    const data = new FormData()
    data.append('file', file)
    axios.post("http://localhost:8080/upload", data, { // receive two parameter endpoint url ,form data 
      headers: {
        "Access-Control-Allow-Origin": "*",
        "credentials": "true",
      },
      responseType: 'arraybuffer'
    })
      .then(res => {
        console.log(res.statusText)
        console.log(res.data)

        const encryptedFile = new File([res.data], file.name, {
          type: `${file.type}`,
        });
        uploadFile(encryptedFile)
      })
      window.alert("File Encrypted!")
  }

  async function uploadFile(e) {
    // e.preventDefault();

    let metadata = {
      name: e.name, // Filename at Google Drive
      mimeType: e.mimeType, // mimeType at Google Drive
    };

    let form = new FormData();
    form.append(
      "metadata",
      new Blob([JSON.stringify(metadata)], { type: "application/json" })
    );
    form.append("file", e);

    fetch(
      "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id",
      {
        method: "POST",
        headers: new Headers({ Authorization: "Bearer " + ACCESS_TOKEN }),
        body: form,
      }
    )
      .then((res) => res.json())
      .then((info) => {
        console.log(info)
        e.value = ""
      })
  }
  async function handleDecryption(file) {
    const data = new FormData()
    data.append('file', file)
    await axios.post("http://localhost:8080/decrypt", data, { // receive two parameter endpoint url ,form data 
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      responseType: 'blob'
    })
      .then(res => { // then print response status
        console.log(res.statusText)
        console.log(res)
        console.log("MIMETYPE: ", res.data.type)
        let blob = new Blob([data], { type: 'application/pdf' })
        let url = URL.createObjectURL(blob)

        const decryptedFile = new File([res.data], file.name, {
          type: file.type,
        });
        console.log(decryptedFile)
        setFile(decryptedFile)
      })
    console.log(file)
      .catch(error => {
        console.log(error);
      });
    itemOpenHandler(file)
    setAllowDelete(true)
    window.alert("File decrypted!")
  }
  async function itemOpenHandler(file) {
    setOpenEx(file.name.split('.').pop());
    if (file.name.split('.').pop() === 'pdf') {

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = (e) => {
        setPdfFile(e.target.result);
      }
      // setFile('')
      console.log("itemOpen hanler")
    }
    else if (file.name.split('.').pop() === 'jpg') {
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
        <h1 class="text-center" ref={(_subtitle) => (subtitle = _subtitle)}><b>{file ? file.name : "no files uploaded yet"}</b></h1>
        <Button type='primary' onClick={closeModal} danger>Close</Button>

        <div style={{ overflow: 'hidden', maxHeight: '20%' }}>

          {pdfFile && (

            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.1.81/build/pdf.worker.min.js">
              <Viewer fileUrl={pdfFile}
                plugins={[defaultLayoutPluginInstance]}></Viewer>
            </Worker>
          )}

        </div>
        {img &&
          <div >
            {
              img &&
              <div>
                <img src={window.URL.createObjectURL(img)} alt="" />
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
