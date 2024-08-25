import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";

import Page from './page.jsx'
import StandardRecipe from './standardRecipe/page.jsx'
import StandardRecipeDetail from './standardRecipeDetail/page.jsx'
import AddStandardRecipe from './addStandardRecipe/page.jsx'

import './index.css'
import './globals.css'

const router = createBrowserRouter([
    { path: "/", element: <Page /> },
    { path: "/standardRecipe", element: <StandardRecipe /> },
    { path: "/standardRecipeDetail", element: <StandardRecipeDetail /> },
    { path: "/addStandardRecipe", element: <AddStandardRecipe /> },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)
