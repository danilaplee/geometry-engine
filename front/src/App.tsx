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

import { firebaseConfig } from './config'

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
