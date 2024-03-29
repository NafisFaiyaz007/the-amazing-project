/* eslint-disable no-undef */
import { data } from 'autoprefixer';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from "./context/AuthContext";

function ImageAuth() {
  const { user } = UserAuth();
  const navigate = useNavigate();
//const [userExists, setUserExists] = useState(true)
  let faceioInstance = null
  console.log(user.email)

    const userExists = async (email) => {
      try {
        console.log(`${email} Inside try`)
        await axios.get(`http://localhost:8000/${email}`
        ,{
          headers: {
            Authorization: `Bearer AIzaSyCb4XHQiJKq5WOF-IIjCsZIpvg94B3NYiY`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then((res) => {
          console.log(res.data.Email)
          return true
          
        });
        // => console.log( "sdawdwa"))
      }
      catch (errorCode) {
        console.log(errorCode)
        handleError(errorCode)
        return false
      }
    }

    useEffect(() => {
    //  console.log("useEffect called")
    // // userExists(user.userEmail)
    // // console.log(user.userEmail)
     userExists(user.userEmail)
    const faceIoScript = document.createElement('script')
    faceIoScript.src = '//cdn.faceio.net/fio.js'
    faceIoScript.async = true
    faceIoScript.onload = () => faceIoScriptLoaded()
    document.body.appendChild(faceIoScript)

    return () => {
      document.body.removeChild(faceIoScript)
    }  }, [])

  const faceIoScriptLoaded = () => {
    console.log(faceIO)
    if (faceIO && !faceioInstance) {
      faceioInstance = new faceIO("fioa5a8c")
    }
  }
  
  const faceRegistration = async () => {
    try {
      const userInfo = await faceioInstance.enroll({
        locale: "auto",
        payload: {
          email: "trungquandev01@gmail.com",
          userId: "170795-id-trungquandev",
          username: "trungquandev",
          website: "https://trungquandev.com"
        },
      })
      console.log(userInfo)
      console.log('Unique Facial ID: ', userInfo.facialId)
      console.log('Enrollment Date: ', userInfo.timestamp)
      console.log('Gender: ', userInfo.details.gender)
      console.log('Age Approximation: ', userInfo.details.age)
      const api = axios.create({
        baseURL: 'http://localhost:8000/api', 
        headers: {
          'Authorization': 'Bearer' + 'AIzaSyCb4XHQiJKq5WOF-IIjCsZIpvg94B3NYiY'
        }
      })
     
      const userinfo = new FormData();
      userinfo.append("Name", user.displayName);
      userinfo.append("Email", user.Email);
      userinfo.append("Image", facialId);
      api.post('/', userinfo).catch(console.error())

    navigate("/drive"); 
  } catch (errorCode) {
      console.log(errorCode)
      handleError(errorCode)
    }
  }

  const faceSignIn = async () => {
    try {
      console.log(faceioInstance)
      const userData = await faceioInstance.authenticate({
        locale: "auto",
      })
      console.log(userData)
  
      console.log('Unique Facial ID: ', userData.facialId)
      console.log('PayLoad: ', userData.payload)
   navigate('/account'); 
   } catch (errorCode) {
      console.log(errorCode)
      handleError(errorCode)
    }
  }

  const handleError = (errCode) => {
    // Log all possible error codes during user interaction..
    // Refer to: https://faceio.net/integration-guide#error-codes
    // for a detailed overview when these errors are triggered.
    // const fioErrCode={PERMISSION_REFUSED:1,NO_FACES_DETECTED:2,UNRECOGNIZED_FACE:3,MANY_FACES:4,PAD_ATTACK:5,FACE_MISMATCH:6,NETWORK_IO:7,WRONG_PIN_CODE:8,PROCESSING_ERR:9,UNAUTHORIZED:10,TERMS_NOT_ACCEPTED:11,UI_NOT_READY:12,SESSION_EXPIRED:13,TIMEOUT:14,TOO_MANY_REQUESTS:15,EMPTY_ORIGIN:16,FORBIDDDEN_ORIGIN:17,FORBIDDDEN_COUNTRY:18,UNIQUE_PIN_REQUIRED:19,SESSION_IN_PROGRESS:20}
    switch (errCode) {
      case fioErrCode.PERMISSION_REFUSED:
        console.log("Access to the Camera stream was denied by the end user")
        break
      case fioErrCode.NO_FACES_DETECTED:
        console.log("No faces were detected during the enroll or authentication process")
        break
      case fioErrCode.UNRECOGNIZED_FACE:
        console.log("Unrecognized face on this application's Facial Index")
        break
      case fioErrCode.MANY_FACES:
        console.log("Two or more faces were detected during the scan process")
        break
      case fioErrCode.PAD_ATTACK:
        console.log("Presentation (Spoof) Attack (PAD) detected during the scan process")
        break
      case fioErrCode.FACE_MISMATCH:
        console.log("Calculated Facial Vectors of the user being enrolled do not matches")
        break
      case fioErrCode.WRONG_PIN_CODE:
        console.log("Wrong PIN code supplied by the user being authenticated")
        navigate("/")
        break
      case fioErrCode.PROCESSING_ERR:
        console.log("Server side error")
        break
      case fioErrCode.UNAUTHORIZED:
        console.log("Your application is not allowed to perform the requested operation (eg. Invalid ID, Blocked, Paused, etc.). Refer to the FACEIO Console for additional information")
        break
      case fioErrCode.TERMS_NOT_ACCEPTED:
        console.log("Terms & Conditions set out by FACEIO/host application rejected by the end user")
        break
      case fioErrCode.UI_NOT_READY:
        console.log("The FACEIO Widget code could not be (or is being) injected onto the client DOM")
        break
      case fioErrCode.SESSION_EXPIRED:
        console.log("Client session expired. The first promise was already fulfilled but the host application failed to act accordingly")
        break
      case fioErrCode.TIMEOUT:
        console.log("Ongoing operation timed out (eg, Camera access permission, ToS accept delay, Face not yet detected, Server Reply, etc.)")
        break
      case fioErrCode.TOO_MANY_REQUESTS:
        console.log("Widget instantiation requests exceeded for freemium applications. Does not apply for upgraded applications")
        break
      case fioErrCode.EMPTY_ORIGIN:
        console.log("Origin or Referer HTTP request header is empty or missing")
        break
      case fioErrCode.FORBIDDDEN_ORIGIN:
        console.log("Domain origin is forbidden from instantiating fio.js")
        break
      case fioErrCode.FORBIDDDEN_COUNTRY:
        console.log("Country ISO-3166-1 Code is forbidden from instantiating fio.js")
        break
      case fioErrCode.SESSION_IN_PROGRESS:
        console.log("Another authentication or enrollment session is in progress")
        break
      case fioErrCode.NETWORK_IO:
      default:
        console.log("Error while establishing network connection with the target FACEIO processing node")
        break
    }
  }

  if(userExists(user.email)== true){
    return (console.log("here"),
        <div className="w-auto min-h-screen grid h-screen place-items-center m-auto text-center">
        <button className="action face-sign-in bg-primary  rounded-full text-2xl py-4 px-6 md:px-10 lg:py-6 lg:px-12 
          font-bold uppercase cursor-pointer hover:opacity-75 duration-150" onClick={faceSignIn} style = {{color:"white"}}>Image Authentication</button>
        </div>
    )
  }
  else{
    return (console.log("not here"),
        <div className="w-auto min-h-screen grid h-screen place-items-center m-auto text-center">
        <button className="action face-registration bg-primary  rounded-full text-2xl py-4 px-6 md:px-10 lg:py-6 lg:px-12 
          font-bold uppercase cursor-pointer hover:opacity-75 duration-150" onClick={faceRegistration} style = {{color:"white"}}>Image Registration</button>
        </div>
    )
  }
}

export default ImageAuth;