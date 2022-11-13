import React from "react";
import { UserAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Profile from "./components/Profile";
import { CameraFeed } from "./components/camera-feed";

export default function App() {
  return(
    <div className="min-h-screen pt-20 flex text-white>
      <CameraFeed/>
    </div>
  )   
  }

