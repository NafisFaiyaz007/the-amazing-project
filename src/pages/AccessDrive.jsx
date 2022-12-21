// this is the code for the landing page 

import React from 'react';
import { Link } from "react-router-dom";


const AccessDrive = () => {
  let CLIENT_ID = "864122802237-kps8qeuj41ror2fh8b81d51vi89qkl6m.apps.googleusercontent.com";
  //"572807278348-7nc0l5ht18q9ckcnrfu17c5dhk4cn9l5.apps.googleusercontent.com";
let REDIRECT_URI = "http://localhost:3000/account";
let SCOPES = "https://www.googleapis.com/auth/drive";

// function sign() {
  
//   signIn(CLIENT_ID, REDIRECT_URI, SCOPES);
// }
function signIn(clientId,redirectUri,scopes,response_type="token") {
  let oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

  let form = document.createElement("form");
  form.setAttribute("method", "GET");
  form.setAttribute("action", oauth2Endpoint);

  let params = {
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: response_type,
    scope: scopes,
    include_granted_scopes: "true",
    state: "pass-through-value",
  };

  for (var p in params) {
    let input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("name", p);
    input.setAttribute("value", params[p]);
    form.appendChild(input);
  }

  document.body.appendChild(form);

  form.submit();
}
  return (
    <div className="min-h-screen pt-20 flex flex-col text-white">
      <main className="container mx-auto px-6 pt-16 flex-1 text-center">

        {/* buttons directing to google authentication */}
        <div>
          <button onClick={() => signIn(CLIENT_ID,REDIRECT_URI, SCOPES)}
            className='bg-primary  rounded-full text-2xl py-4 px-6 md:px-10 lg:py-6 lg:px-12 
          font-bold uppercase cursor-pointer hover:opacity-75 duration-150" /> '
          >ACCESS DRIVE
            {/* <Link to="/signin">Sign in</Link> */}
          </button>


          
        </div>
      </main>
    </div>
  );
}

export default AccessDrive