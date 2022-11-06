import logo from "./logo.svg";
import React from "react";

import "./App.css";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Redirect,
// } from "react-router-dom";

function App() {

  return (
    <div className="min-h-screen flex flex-col text-white">
      <main className="container mx-auto px-6 pt-16 flex-1 text-center">
        <h2 className="text-2xl md:text-4xl lg:text-6xl uppercase">
          Welcome to
        </h2>
        <h1 className="text-3xl md:text-6xl lg:text-8xl uppercase font-black mb-8">
          The amazing app
        </h1>

        <p className="text-base md:text-lg lg:text-2xl mb-8">
          A place of confedentials!
        </p>

 
        <form
          action="/src/Authorization and drive/index.html"
          method="post"
          
          target=""
        >
          <div className="flex flex-col md:flex-row justify-center mb-4">
           
            <input
              type="submit"
              value="Sign in"
              name="member[subscribe]"
              id="member_submit"
              className="bg-primary  rounded-full text-2xl py-4 px-6 md:px-10 lg:py-6 lg:px-12 font-bold uppercase cursor-pointer hover:opacity-75 duration-150"
            />
          </div>

         
        </form>
      </main>

    </div>
  );
}

export default App;
