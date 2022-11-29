// // import React from "react";
// // import ReactDOM from "react-dom";
// // import FileViewer from "react-file-viewer";

// // import "./DragDrop.css";

// // const file = "../CSE 299 project description.pdf";
// // const type = "pdf";

// // const onError = (e) => {
// //   console.log(e, "error in file-viewer");
// // };

// // export default function Viewer() {
// //   return (
// //     <div className="App">
// //       <h1>React File Viewer Demo</h1>
// //       <h2>Displaying file with extension {type}</h2>
// //       <FileViewer fileType={type} filePath={file} onError={onError} />
// //     </div>
// //   );
// // }

// // const rootElement = document.getElementById("fileviewer");
// // // eslint-disable-next-line no-undef
// // ReactDOM.render(<Viewer />, root);

// import React, { Component } from 'react';
// import logger from 'react-logger-lib';
// import FileViewer from 'react-file-viewer';
// import { CustomErrorComponent } from 'custom-error';


// const file = "../test.docx"
// const type = 'docx'

// export default class Viewer extends Component {
//   render() {
//     return (
//       <FileViewer
//         fileType={type}
//         filePath={file}
//         errorComponent={CustomErrorComponent}
//         onError={this.onError}/>
//     );
//   }

//   onError(e) {
//     logger.logError(e, 'error in file-viewer');
//   }
// }

// ************************** this works but only for pdf and jpg *******************//
import "./styles.css";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

export default function Viewer() {
  const docs = [
    
    { uri: require("../CSE 299 project description.pdf") },
   
  ];

  return (
    <div className="DragDrop">
      <h1>Sample react-doc-viewer</h1>
      <DocViewer
        pluginRenderers={DocViewerRenderers}
        documents={docs}
        config={{
          header: {
            disableHeader: false,
            disableFileName: false,
            retainURLParams: false
          }
        }}
        style={{ height: 800 }}
      />
    </div>
  );
}


// import React from "react";
// import ReactDOM from "react-dom";
// import FileViewer from "react-file-viewer";

// import "./styles.css";

// const file = "./Case-Study-Shell.pdf";
// const type = "pdf";

// const onError = (e) => {
//   console.log(e, "error in file-viewer");
// };

// const props = {
//   allowFullScreen: true,
//   src:
//     "http://projects.itsasbreuk.nl/react-components/itsa-docviewer/example.pdf"
// };

// export default function Viewer() {
//   return (
//     <div className="App">
//       <h1>React File Viewer Demo</h1>
//       <h2>Displaying file with extension {type}</h2>
//       <FileViewer fileType={type} filePath={file} onError={onError} />
//     </div>
//   );
// }


// import {useState} from 'react'

// // Import Worker
// import { Worker } from '@react-pdf-viewer/core';
// // Import the main Viewer component
// import { Viewer } from '@react-pdf-viewer/core';
// // Import the styles
// import '@react-pdf-viewer/core/lib/styles/index.css';
// // default layout plugin
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// // Import styles of default layout plugin
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// import { pdfjs } from 'react-pdf';
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}> /pdf.worker.js`



// function FileShow() {

//   // creating new plugin instance
//   const defaultLayoutPluginInstance = defaultLayoutPlugin();

//   // pdf file onChange state
//   const [pdfFile, setPdfFile]=useState(null);

//   // pdf file error state
//   const [pdfError, setPdfError]=useState('');


//   // handle file onChange event
//   const allowedFiles = ['application/pdf'];
//   const handleFile = (e) =>{
//     let selectedFile = e.target.files[0];
//     // console.log(selectedFile.type);
//     if(selectedFile){
//       if(selectedFile&&allowedFiles.includes(selectedFile.type)){
//         let reader = new FileReader();
//         reader.readAsDataURL(selectedFile);
//         reader.onloadend=(e)=>{
//           setPdfError('');
//           setPdfFile(e.target.result);
//         }
//       }
//       else{
//         setPdfError('Not a valid pdf: Please select only PDF');
//         setPdfFile('');
//       }
//     }
//     else{
//       console.log('please select a PDF');
//     }
//   }

//   return (
//     <div className="container">

//       {/* Upload PDF */}
//       <form>

//         <label><h5>Upload PDF</h5></label>
//         <br></br>

//         <input type='file' className="form-control"
//         onChange={handleFile}></input>

//         {/* we will display error message in case user select some file
//         other than pdf */}
//         {pdfError&&<span className='text-danger'>{pdfError}</span>}

//       </form>

//       {/* View PDF */}
//       <h5>View PDF</h5>
//       <div className="viewer">

//         {/* render this if we have a pdf file */}
//         {pdfFile&&(
//           <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
//             <Viewer fileUrl={pdfFile}
//             plugins={[defaultLayoutPluginInstance]}></Viewer>
//           </Worker>
//         )}

//         {/* render this if we have pdfFile state null   */}
//         {!pdfFile&&<>No file is selected yet</>}

//       </div>

//     </div>
//   );
// }

// export default FileShow;
