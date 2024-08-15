import {useNavigate } from "react-router-dom"
import { useEffect , useState } from "react"
import { axiosClient } from "../../api/axios"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"


export default function AfficherAdmin(){

    const navigate=useNavigate()
    const [Admin,setAdmin]=useState({})
    
      useEffect(()=>{
    
    
        if(!window.localStorage.getItem('ACCESS_TOKEN')){
          navigate('/login')
        }
      getAdmin()
     console.log(Admin)
      },[])


      const getAdmin=()=>{
        axiosClient.get('/user').then(response=>{
          setAdmin(response.data)
      })
      }
    
      return (
        <div className="container mt-10">
                    <Card className="w[350px] sm:max-w-md sm:mx-auto">
        <CardHeader>
          <CardTitle>Salut {Admin.nom}</CardTitle>
          <CardDescription>
            Gérer Etudiants et Enseignants.
          </CardDescription>
        </CardHeader>
        <CardContent>
          Nom : {Admin.nom}  <br />
          Prenom : {Admin.prenom}  <br />
          Email : {Admin.email}  <br />

        </CardContent>
        <CardFooter className="flex justify-between">
        </CardFooter>
      </Card>

        </div>
      )
  }