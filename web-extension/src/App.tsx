import React, { useEffect, useState } from 'react';
import { BrowserRouter, createBrowserRouter, Outlet, Route, RouterProvider, Routes } from 'react-router-dom';
import TutorialPopperComponent from './core/components/TutorialPopperComponent';

const router = createBrowserRouter([
  {
    path: "/test",
    element: <div id="test"><p>Hello World!123123123123</p><Outlet/></div>, 
    errorElement: <div><p>Error!</p></div>, // TODO: Build an error page
    children: [
      {
        path: "tut",
        element: <TutorialPopperComponent popperConfig={{title: "Hello", description: "Hello", targetIdentifier: "#test"}}/>,
        errorElement: <div>Error!</div>
      }
    ]
  },
])

const App = () => {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;