
import { getParamsFromURL, saveOAuth2Info, logout } from "./utils.js";

let params = getParamsFromURL(window.location.href);

let ACCESS_TOKEN="";
let redirect_url = "http://localhost:3000/account";
let button = document.getElementById("logout");
let form = document.getElementById('form');
let file = document.getElementById("files");

let search = document.getElementById("search");
let images = document.getElementById("images");
let videos = document.getElementById("videos");
let pdf = document.getElementById("pdf");
let result = document.getElementById("result");

search.onclick = listFiles;
images.onclick = getImages;
videos.onclick = getVideos;
pdf.onclick = getPDF;

saveOAuth2Info(params, "profile.html", "info");



let info = JSON.parse(localStorage.getItem("info"));
ACCESS_TOKEN = info.access_token;
console.log(ACCESS_TOKEN)

form.onsubmit = uploadFile


function uploadFile(e) {
    e.preventDefault();
  
    let metadata = {
      name: "file.jpg", // Filename at Google Drive
      mimeType: "image/jpg", // mimeType at Google Drive
      //parents: ["1_CgaBLdT6aytm-6f-_IRguycxPh_TGuo"], // Folder ID at Google Drive
    };
  
let form = new FormData();
    form.append(
      "metadata",
      new Blob([JSON.stringify(metadata)], { type: "application/json" })
    );
    form.append("file", file.files[0]);
  
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
                file.value = ""
            })
  }

function listFiles() {
    searchFiles("",70);   
  }
  function getImages() {
    searchFiles("mimeType contains 'image/'",50);
  }
  function getVideos() {
    searchFiles("mimeType contains 'video/'",50);
  }
  function getPDF() {
    searchFiles("mimeType contains 'application/pdf'",50);
  }

  function searchFiles(q = "", pageSize) {
    result.innerHTML = "";
    fetch(`https://www.googleapis.com/drive/v3/files?q=${q}&pageSize=50&supportsAllDrives=true&fields=files(name,id,mimeType,webContentLink)`,{
      method: "GET",
      headers: new Headers({ Authorization: "Bearer " + ACCESS_TOKEN }),
    })
    .then((res) => res.json())
    .then((info) => {
      console.log(info)
      info.files.forEach(file => {
        let id = file.id
        result.innerHTML += `
          <tr>
            <td>
            <a target="_blank" href="https://drive.google.com/file/d/${file.id}">${file.name}</a>
            </td>
            <td>${file.mimeType}</td>
            <td>
            <a target="_blank" href="${file.webContentLink}">Download ${file.name}</a>
            </td>

            <td>
            <button onclick="
              fetch('https://www.googleapis.com/drive/v3/files/${id}',{
              method:'DELETE',
              headers: new Headers({ Authorization: 'Bearer ${ACCESS_TOKEN}'})
            })
            .then((info) => {
              console.log(info)
              alert('file is deleted')
            })
            
            ">Delete ${file.name}</button>
          </td>
          
          </tr> 
        
        
        `
      });
    })
  }

  button.onclick = logoutUser

  function logoutUser(){
    logout(ACCESS_TOKEN, redirect_url)
  }

console.log(params);