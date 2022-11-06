import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TutorialPopperComponent from './core/components/TutorialPopperComponent';
import { CreatorApp } from './creator/CreatorApp';

const router = createBrowserRouter([
  {
    path: "/creator",
    element: <CreatorApp/>, 
    errorElement: <div><p>Error!</p></div>, 
  },
  {
    path: "/test",
    element: <p>Hello</p>,
    errorElement: <div><p>Error!</p></div>, 
    children: [
      {
        path: "tut",
        element: <TutorialPopperComponent popperConfig={{title: "Hello", description: "Hello", targetIdentifier: "#test"}}/>,
        errorElement: <div>Error!</div>
      }
    ]
  }
])

const App = () => {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;