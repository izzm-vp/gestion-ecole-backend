import { createBrowserRouter} from 'react-router-dom'
import Layout from '../Layout/Layout'
import Home from '../Pages/Home'
import EtudiantLayout from '../Layout/StudentLayout/EtudiantDashboard'
import AfficherEtudiant from '../Layout/StudentLayout/AfficherEtudiant'
import { ModifierEtudiant } from '../Layout/StudentLayout/ModifierEtudiant'
import AdminLayout from '../Layout/AdminLayout/AdminDashboard'
import EnseignantLayout from '../Layout/EnseignantLayout/EnseignantDashboard'
import AfficherEnseignant from '../Layout/EnseignantLayout/AfficherEnseignant'
import AfficherEnseignants from '../Layout/AdminLayout/AfficherEnseignants'
import AjouterEnseignant from '../Layout/AdminLayout/AjouterEnseignant'
import AfficherAdmin from '../Layout/AdminLayout/AfficherAdmin'
import Inscription from '../Pages/inscription'
import AffEtd from '../Layout/AdminLayout/AfficherEtudiants'
import LoginPage from '../Pages/loginPage'
import AjouterExam from '../Layout/EnseignantLayout/AjouterExam'
import AjouterNote from '../Layout/EnseignantLayout/AjouterNote'



export const route=createBrowserRouter([
    {
        element: <Layout/>,
        children:[    {
            path:'/',
            element: <Home/>
        },
        {
            path:'/login',
            element: <LoginPage/>
        },
    
        {
            path:'/inscription',
            element: <Inscription/>
        },
    ]
    },
    {
        path:'*',
        element:"Page Not Found"
    },
    {
        element:<EtudiantLayout/>,
        children:[
           {
            path:"/etudiant/afficher",
            element:<AfficherEtudiant/>
           },
           {
            path:"/etudiant/modifier",
            element:<ModifierEtudiant/>
           }
        ]
    },
    {
        element:<AdminLayout/>,
        children:[
           {
            path:"/admin/afficher",
            element:<AfficherAdmin/>
           },
           
           {
            path:"/admin/géreEnseignants",
            element:<AfficherEnseignants/>
           },
           
           
           {
            path:"/admin/géreEtudiants",
            element:<AffEtd/>
           },
           {
            path:"/admin/ajouterEnseignant",
            element:<AjouterEnseignant/>
           },
        ]
    },
    {
        element:<EnseignantLayout/>,
        children:[
           {
            path:"/enseignant/afficher",
            element:<AfficherEnseignant/>
           },
           {
            path:"/enseignant/exams",
            element:<AjouterExam/>
           },
           
           {
            path:"/enseignant/notes",
            element:<AjouterNote/>
           },
        ]
    },
])