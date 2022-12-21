import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from '../components/Navbar';
import DragDrop from '../components/DragDrop';
import DriveList from './DriveList'

const Account = () => {
  const [showDrive, setShowDrive] = useState(false)
  const [viewList, setViewList] = useState(false)
  const [listDocumentsVisible, setListDocumentsVisibility] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [isLoadingGoogleDriveApi, setIsLoadingGoogleDriveApi] = useState(false);
  const [isFetchingGoogleDriveFiles, setIsFetchingGoogleDriveFiles] = useState(false);
  const [signedInUser, setSignedInUser] = useState();
  const history = useNavigate();
  //let ACCESS_TOKEN = '';
  var htmlText;
  const [searchParams, setSearchParams] = useSearchParams();
  searchParams.get("access_token")
  const queryParameters = new URLSearchParams(window.location.href)
  let ACCESS_TOKEN = queryParameters.get("access_token")
  console.log(ACCESS_TOKEN)
  const API_KEY = "AIzaSyBSHZvkAoOLP7maxymnrcXTMZjUiudQIVw";

  // Array of API discovery doc URLs for APIs
  const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];

  let CLIENT_ID =
    "572807278348-7nc0l5ht18q9ckcnrfu17c5dhk4cn9l5.apps.googleusercontent.com";
  let REDIRECT_URI = "http://localhost:3000/account";
  let SCOPES = "https://www.googleapis.com/auth/drive";

  let redirect_url = "http://localhost:3000/account";

  async function listDrive() {
    setViewList(true);
    searchFiles("", 2)
    DriveList(documents)
  }


  function searchFiles(q = "", pageSize) {
    // result.innerHTML = "";
    fetch(`https://www.googleapis.com/drive/v3/files?q=${q}&pageSize=50&supportsAllDrives=true&fields=files(name,id,mimeType,webContentLink)`, {
      method: "GET",
      headers: new Headers({ Authorization: "Bearer " + ACCESS_TOKEN }),
    })
      .then((res) => res.json())
      .then((info) => {
        console.log(info)
        info.files.forEach(file => {
          let id = file.id;
          documents.push(file);
          setShowDrive(true);

        });
      })

  }

  function logout(access_token, redirect_url) {
    fetch("https://oauth2.googleapis.com/revoke?token=" + access_token, {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
    }).then((data) => {
      window.location.href = redirect_url;
    });
  }
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
          <div>
            <button
              onClick={() => listDrive()}//searchFiles("", 70)}
              className='bg-primary text-black rounded-full md:text-s lg:text-xl py-4 px-6 md:px-auto mb-4 mr-4 lg:py-2 lg:px-auto 
          font-bold uppercase cursor-pointer hover:opacity-75 duration-150" /> '
            >
              Show Drive Files
            </button>

            {showDrive &&

              <DriveList documents={documents} />
            }

          </div>
        </div>


      </div>
    </div>
  );
};

export default Account;
