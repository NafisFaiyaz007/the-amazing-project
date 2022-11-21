import React, { useEffect } from 'react';
import { gapi } from 'gapi-script';
import useDrivePicker from 'react-google-drive-picker';
import { UserAuth } from "./AuthContext";

const CLIENT_ID = "860291470589-975lo36kfv4mt2lib164d84gr4vkoi6e.apps.googleusercontent.com";

const API_KEY = "AIzaSyAWjxUQ5nauj9lCAP1cwD6miDrexZQUlmo";
const SCOPES = "https://www.googleapis.com/auth/drive";

function App() {
  const { user } = UserAuth();
  const [openPicker, data, authResponse] = useDrivePicker()
  console.log(user.refreshToken)
  const handleOpenPicker = () => {
    openPicker({
      clientId: CLIENT_ID,
      developerKey: API_KEY,
      viewId: "DOCS",
      token: user.accessToken,
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true
    })
  }

  useEffect(() => {
    function start() {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPES,
      })
    };

    gapi.load('client:auth2', start);

    if(data){
      data.docs.map((i) => console.log(i)) 
    }

  },[data])

  return (
    <div className="App">

      <button  className=" bg-primary rounded-full text-xl text-center border py-2 px-5 mt-10" id='bttn1' onClick={() => handleOpenPicker()}>Import File</button>
    </div>
    
       
  );
}

export default App;
