import React from 'react';
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Home = () => {
  return (
    // <div>
    //   <h1 className='text-center text-3xl font-bold py-8'>Home Page</h1>
    // </div>

    <div className="min-h-screen pt-20 flex flex-col text-white">
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

        {/* <form
          action="/src/pages/Signin.jsx/"
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
        </form> */}
        <div>
          <button
            className='bg-primary  rounded-full text-2xl py-4 px-6 md:px-10 lg:py-6 lg:px-12 
          font-bold uppercase cursor-pointer hover:opacity-75 duration-150" /> '
          >
            <Link to="/signin">Sign up</Link>
          </button>
          <button
            className=' rounded-full text-2xl py-4 px-6 md:px-10 lg:py-6 lg:px-12 
          font-bold uppercase px-5 text-white-1000 transition-colors duration-150 border 
          border-white-500 focus:shadow-outline hover:bg-primary-500 hover:text-white-100" /> '>
            <Link to="/signin">Log in</Link>
          </button>
        </div>
      </main>
    </div>
  );
}

export default Home