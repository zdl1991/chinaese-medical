import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";

import Page from './page.jsx'
import StandardRecipe from './standardRecipe/page.jsx'
import StandardRecipeDetail from './standardRecipeDetail/page.jsx'
import AddStandardRecipe from './addStandardRecipe/page.jsx'
import Patient from './patient/page.jsx'
import PatientDetail from './patientDetail/page.jsx'
import AddPatient from './addPatient/page.jsx'
import Recipe from './recipe/page.jsx'
import RecipeDetail from './recipeDetail/page.jsx'
import AddRecipe from './addRecipe/page.jsx'

import './index.css'
import './globals.css'

const router = createBrowserRouter([
    { path: "/", element: <Page /> },
    { path: "/standardRecipe", element: <StandardRecipe /> },
    { path: "/standardRecipeDetail", element: <StandardRecipeDetail /> },
    { path: "/addStandardRecipe", element: <AddStandardRecipe /> },
    { path: "/patient", element: <Patient /> },
    { path: "/patientDetail", element: <PatientDetail /> },
    { path: "/addPatient", element: <AddPatient /> },
    { path: "/recipe", element: <Recipe /> },
    { path: "/recipeDetail", element: <RecipeDetail /> },
    { path: "/addRecipe", element: <AddRecipe /> },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)
