import React from 'react';

import './App.css';

import GELogin from './views/GELogin'

import GEUploadForm from './views/GEUploadForm'

import GEViewer from './views/GEViewer'

import {
  createBrowserRouter,
  RouterProvider
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
