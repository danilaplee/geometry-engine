import React from 'react';

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


import './App.css';

import GELogin from './views/GELogin'

import GEUploadForm from './views/GEUploadForm'

import GEViewer from './views/GEViewer'

const firebaseConfig = {
  apiKey: "AIzaSyBzcwX3ybLkNpbfe2Ss-1Mo_8JsV3dVbrk",
  authDomain: "geometry-lab.firebaseapp.com",
  databaseURL: "https://geometry-lab-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "geometry-lab",
  storageBucket: "geometry-lab.appspot.com",
  messagingSenderId: "853066501500",
  appId: "1:853066501500:web:8aee5ff90f42239557e8f9",
  measurementId: "G-BCW9V25BYL"
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <GELogin />,
  },
  {
    path: "/viewer",
    element: <GEViewer />
  },
  {
    path: "/upload",
    element: <GEUploadForm />
  },
  {
    path: "/finishSignUp",
    element: <GELogin />
  },
]);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
