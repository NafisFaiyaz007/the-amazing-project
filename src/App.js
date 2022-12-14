import React from 'react';
import { Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar';
import Protected from './components/Protected';
import { AuthContextProvider } from './context/AuthContext';
import Account from './pages/Account';
import Home from './pages/Home';
import Signin from './pages/Signin';
// import {Image } from './pages/index';
// import CameraFeed from './pages/CapturePicture.jsx'

import Check from './check';
import Authenticate from './Authenticate';
import Enroll from './Enroll';
// import Drive from './gdrive/drive';


// import ImageUpload from './components/TakePic';

function App() {
//   var cors = require('cors')

// app.use(cors());
  return (
    <div>
      <AuthContextProvider>
      
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/check' element={<Check />} />
          {/* <Route path='/camera' element={<ImageUpload/>}/> */}
          <Route path='/authenticate' element={<Authenticate/>}/>
          <Route path='/enroll' element={<Enroll/>}/>
          {/* <Route path='/drive' element={<Drive/>}/> */}
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