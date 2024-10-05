import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";

import Page from './page.jsx'
import Standard from './standard/page.jsx'
import StandardDetail from './standardDetail/page.jsx'
import AddStandard from './addStandard/page.jsx'
import Patient from './patient/page.jsx'
import PatientDetail from './patientDetail/page.jsx'
import AddPatient from './addPatient/page.jsx'
import Recipe from './recipe/page.jsx'
import RecipeDetail from './recipeDetail/page.jsx'
import AddRecipe from './addRecipe/page.jsx'
import Top from './top.jsx'
import { Layout } from 'antd';
import './index.css'
import './globals.css'
import styles from "./page.module.css";

const { Content } = Layout;

const router = createBrowserRouter([
    { path: "/home", element: <Page /> },
    { path: "/standard", element: <Standard /> },
    { path: "/standardDetail", element: <StandardDetail /> },
    { path: "/addStandard", element: <AddStandard /> },
    { path: "/patient", element: <Patient /> },
    { path: "/patientDetail", element: <PatientDetail /> },
    { path: "/addPatient", element: <AddPatient /> },
    { path: "/recipe", element: <Recipe /> },
    { path: "/recipeDetail", element: <RecipeDetail /> },
    { path: "/addRecipe", element: <AddRecipe /> },
]);

const homeStyle = {
    background: window.location.pathname == '/home' ? '#fff' : 'transparent',
    //padding: window.location.pathname == '/home' ? '0' : '0 48px'
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <main className={styles.main}>
            <Layout>
                <Top/>

                <Content style={homeStyle}>
                    <RouterProvider router={router} />
                </Content>
            </Layout>
        </main>
    </StrictMode>
)
