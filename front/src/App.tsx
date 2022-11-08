import React from 'react';

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

import './App.css';

import GELogin from './routes/login'

import GEUploadForm from './routes/upload'

import GEViewer from './routes/viewer'

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
const db = getDatabase(app);


function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
