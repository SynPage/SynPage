import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CreatorApp } from './CreatorApp';

const router = createBrowserRouter([
  {
    path: "/creator",
    element: <CreatorApp/>, 
    errorElement: <div><p>Error!</p></div>, 
  },
])

const App = () => {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;