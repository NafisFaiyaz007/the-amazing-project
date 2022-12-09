// this is the code for the landing page 

import React from 'react';
import { Link } from "react-router-dom";


const Home = () => {
  return (
    <div className="min-h-screen pt-20 flex flex-col text-white">
      <main className="container mx-auto px-6 pt-16 flex-1 text-center">
        <h2 className="text-2xl md:text-4xl lg:text-6xl uppercase">
          Welcome to
        </h2>
        <h1 className="text-3xl md:text-6xl lg:text-8xl uppercase font-black mb-8">
          The amazing app
        </h1>

        <p className="text-base md:text-lg lg:text-2xl mb-8">
          A place of confidentials!
        </p>

        {/* buttons directing to google authentication */}
        <div>
          <button
            className='bg-primary  rounded-full text-2xl py-4 px-6 md:px-10 lg:py-6 lg:px-12 
          font-bold uppercase cursor-pointer hover:opacity-75 duration-150" /> '
          >
            <Link to="/signin">Sign in</Link>
          </button>


          
        </div>
      </main>
    </div>
  );
}

export default Home