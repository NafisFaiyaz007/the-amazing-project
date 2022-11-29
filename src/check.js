import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from "./context/AuthContext";

export default function Check () {
    const { user } = UserAuth();
    const navigate = useNavigate();
    var check = false
    const userExists = async (email) => {
        try {
          await axios.get(`http://localhost:8000/${email}`,{
            headers: {
              Authorization: `Bearer AIzaSyCb4XHQiJKq5WOF-IIjCsZIpvg94B3NYiY`,
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
          })
          .then((res) => {
            check = true
            if(check=== true)
            navigate('/authenticate');  
            
        });
        }
        catch (errorCode) {
              console.log(errorCode)
              navigate('/camera')
              
            }
        }
        
        userExists(user.email)

        
}