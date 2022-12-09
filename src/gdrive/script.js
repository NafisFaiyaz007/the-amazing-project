import {signIn} from './utils.js'

let CLIENT_ID = "572807278348-7nc0l5ht18q9ckcnrfu17c5dhk4cn9l5.apps.googleusercontent.com"
let REDIRECT_URI = "http://127.0.0.1:5500/src/gdrive/profile.html"
let SCOPES = "https://www.googleapis.com/auth/drive"

let button = document.getElementById('button')

button.onclick = sign

export default function sign(){

 signIn(CLIENT_ID,REDIRECT_URI,SCOPES)
 

}