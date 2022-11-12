import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Protected from './components/Protected';
import { AuthContextProvider } from './context/AuthContext';
import Account from './pages/Account';
import Home from './pages/Home';
import Signin from './pages/Signin';
import {Image } from './pages/index';
import  {CameraFeed}  from "./components/camera-feed";

function App() {
  return (
    <div>
      <AuthContextProvider>
        {/* <Navbar /> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/camera' element={<CameraFeed/>}/>
          {/* <Route path='/Image' element={<index/>}/> */}
          <Route
            path='/account'
            element={
              <Protected>
                <Account />
              </Protected>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
