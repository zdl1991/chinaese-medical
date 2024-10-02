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
import Top from './top.jsx'
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
const topRouter = [
    { path: "/", include:'/'},
    { path: "/standardRecipe", include:'standardRecipe'},
    { path: "/standardRecipeDetail", include:'standardRecipe' },
    { path: "/addStandardRecipe", include:'standardRecipe' },
    { path: "/patient", include:'patient' },
    { path: "/patientDetail", include:'patient' },
    { path: "/addPatient", include:'patient' },
    { path: "/recipe", include:'recipe' },
    { path: "/recipeDetail", include:'recipe' },
    { path: "/addRecipe", include:'recipe' },
];

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Top router={topRouter}/>
        <RouterProvider router={router} />
    </StrictMode>
)
