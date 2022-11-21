import ImageCapture from "react-image-data-capture";
import React, { useState } from "react";
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "./context/AuthContext";
import axios from "axios";

export default function ImageUpload(){
  const { user } = UserAuth();

  const [showImgCapture, setShowImgCapture] = useState(true);
  const [URL, setURL] = useState("");
  const config = useMemo(() => ({ video: true }), []);
  /*
    { video: true } - Default Camera View
    { video: { facingMode: environment } } - Back Camera
    { video: { facingMode: "user" } } - Front Camera
  */
  const [imgSrc, setImgSrc] = useState(null);
  const [imageTaken, setImageTaken] = useState(false);
  const navigate=useNavigate();
  const onCapture = (imageData) => {
    // read as webP
    setImgSrc(imageData.blob);
    // read as file
    // Unmount component to stop the video track and release camera
    setShowImgCapture(false);
 
  };
  const onError = useCallback((error) => {
    console.log(error);
  }, []);
  
  if(!imageTaken && imgSrc){
    var temp;
    (async()=>{
      temp = await uploadImage(imgSrc, user.displayName, user.email)
      setURL(temp)
       //store the url in temp variable
   })();
    
    setImageTaken(true);
    navigate('/account')
  }

  // while taking picture
  return (
    <>
      {showImgCapture && (
        <div className="w-auto min-h-screen grid h-screen place-items-center m-auto text-center">       
          <ImageCapture 
            onCapture={onCapture}
            onError={onError}
            width={500}
            userMediaConfig={config}
            
          />
         </div>
      )}
      {/* after taking picture */}
      {imgSrc && (
        <div className="w-auto min-h-screen grid h-screen place-items-center m-auto text-center">
          <div>Captured Image:</div>
          <img src={imgSrc} alt="captured-img" />
          <p>{URL}</p>
        </div>
      )}
    </>
  );
};

// const NAME_OF_UPLOAD_PRESET = "jovml2a5";
// const YOUR_CLOUDINARY_ID = "djcpfxc4t";

const NAME_OF_UPLOAD_PRESET = "amazingapp";
const YOUR_CLOUDINARY_ID = "dohm1cuk2";

// A helper function
async function uploadImage(photo, username, useremail) {
  const data = new FormData();
  data.append("file", photo);
  data.append("upload_preset", NAME_OF_UPLOAD_PRESET);
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${YOUR_CLOUDINARY_ID}/image/upload`,
    {
      method: "POST",
      body: data
    }
  );
  const api = axios.create({
    baseURL: 'http://localhost:8000/api', 
    headers: {
      'Authorization': 'Bearer' + 'AIzaSyCb4XHQiJKq5WOF-IIjCsZIpvg94B3NYiY'
    }
  })
  const img = await res.json();
  console.log(img);
  console.log(img.secure_url);
 
  const userinfo = new FormData();
  userinfo.append("Name", username);
  userinfo.append("Email", useremail);
  userinfo.append("Image", img.secure_url);
  api.post('/', userinfo).catch(console.error())
  return img.secure_url;
}
