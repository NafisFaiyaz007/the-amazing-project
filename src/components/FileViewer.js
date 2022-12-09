

// ************************** this works but only for pdf and jpg *******************//
import "./styles.css";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

export default function Viewer() {
  const docs = [
    
    { uri: require("../CSE 299 project description.pdf") },
   
  ];

  return (
    <div className="DragDrop">
      <h1 className=" text-center text-l md:text-l lg:text-2xl text-white p-5">
        Decrypted Document view</h1>
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


//importing components


// import { useEffect, useState } from "react";
// import axios from '../components/axios';
// import { Button, Modal } from "antd";
// import Loader from "../components/Loader";
// import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";


// const Viewer = ({openPdf, setOpenPdf, openEx}) => {

//     const [numPages, setNumPages] = useState(null);
//     const [pageNumber, setPageNumber] = useState(1);
//     const [loading, setLoading] = useState(true);
//     const [pdf, setPdf] = useState(null);
//     const [docs, setDocs] = useState([]);

//     useEffect(() => {
//         console.log(openPdf)
//     }, []);

//     function removeTextLayerOffset() {
//         const textLayers = document.querySelectorAll(".react-pdf__Page__textContent");
//         textLayers.forEach(layer => {
//             const {style} = layer;
//             style.top = "0";
//             style.left = "0";
//             style.transform = "";
//         });
//     }


//     function onDocumentLoadSuccess({numPages}) {
//         setNumPages(numPages);
//         removeTextLayerOffset()
//     }

//     useEffect(() => {
//         let url = openPdf;
//         axios.get(
//             url,
//             {responseType: 'blob'} // !!!
//         ).then((response) => {
//             // window.open(URL.createObjectURL(response.data));
//             setLoading(false);
//             setPdf(response.data)
//             setDocs([
//                 {
//                     uri: URL.createObjectURL(response.data),
//                 }
//             ])
//         })
//     }, []);

//     return (
//         <Modal
//             visible={openPdf ? true : false}
//             centered={true}
//             footer={null}
//             width={'80%'}
//             onCancel={() => setOpenPdf(null)}
//         >
//             {
//                 loading &&
//                 <Loader height={'80vh'}/>
//             }


//             {
//                 docs.length > 0 &&
//                 <DocViewer documents={docs} pluginRenderers={DocViewerRenderers}/>
//             }


//         </Modal>
//     );
// };

// export default Viewer;
