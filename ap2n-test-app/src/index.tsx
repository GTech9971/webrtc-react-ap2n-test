import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Controller } from './pages/Controller';
import { Home } from './pages/Home';
import { Uploader } from './pages/Uploader';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: < Home />
  },
  {
    path: "uploader",
    element: <Uploader />
  },
  {
    path: "controller",
    element: <Controller />
  }
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode >
);