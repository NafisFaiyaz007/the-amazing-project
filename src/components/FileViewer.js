import React from "react";
import ReactDOM from "react-dom";
import FileViewer from "react-file-viewer";

import "./DragDrop.css";

const file = "../CSE 299 project description.pdf";
const type = "pdf";

const onError = (e) => {
  console.log(e, "error in file-viewer");
};

export default function Viewer() {
  return (
    <div className="App">
      <h1>React File Viewer Demo</h1>
      <h2>Displaying file with extension {type}</h2>
      <FileViewer fileType={type} filePath={file} onError={onError} />
    </div>
  );
}

const rootElement = document.getElementById("fileviewer");
// eslint-disable-next-line no-undef
ReactDOM.render(<Viewer />, root);
