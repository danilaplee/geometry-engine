import React from 'react';
import ReactDOM from 'react-dom'

import logo from './logo.svg';

import './App.css';

import {
  useRef, 
  useState, 
  useEffect, 
  // useReducer
} from 'react'

import styled from 'styled-components'

import GELogin from './views/GELogin'

import GEUploadForm from './views/GEUploadForm'

import GEViewer from './views/GEViewer'

import {
  createBrowserRouter,
  RouterProvider,
  Route
} from 'react-router-dom'

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
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
