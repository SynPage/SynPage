import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {CreatorApp} from './CreatorApp';
import {TutorialManager} from "./TutorialManager";

const router = createBrowserRouter([
    {
        path: "/",
        element: <TutorialManager/>,
        errorElement: <div><p>Error!</p></div>,
    },
    {
        path: "/editor/:id",
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