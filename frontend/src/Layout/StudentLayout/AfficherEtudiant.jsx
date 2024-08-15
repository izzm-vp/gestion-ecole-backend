import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { axiosClient } from "../../api/axios"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"
import { EtdPop } from "./EtdPop"


export default function AfficherEtudiant() {

  const navigate = useNavigate()
  const [Etudiant, setEtudiant] = useState({})

  useEffect(() => {


    if (!window.localStorage.getItem('ACCESS_TOKEN')) {
      navigate('/login')
    }

    if (Etudiant.role === "admin") {
      navigate('/admin/afficher')
    } else if (Etudiant.role === "enseignant") {
      navigate('/enseignant/afficher')
    }

    const getEtudiant = () => {
      axiosClient.get('/user').then(response => {
        setEtudiant(response.data)
        window.localStorage.setItem("Etd", response.data.id)



      })
    }
    getEtudiant()

  }, [])





  return (
    <div className="container mt-10">
      <Card className="w[350px] sm:max-w-md sm:mx-auto">
        <CardHeader>
          <CardTitle>Bonjour {Etudiant.name}</CardTitle>
          <CardDescription>
            Vous pouvez consulter vos relevés d'examens et modifier vos informations ici.
          </CardDescription>
        </CardHeader>
        <CardContent>
          Nom : {Etudiant.name}  <br />
          Prenom : {Etudiant.prenom}  <br />
          Email : {Etudiant.email}  <br />
          <EtdPop Etd={{ id: Etudiant.id, nom: Etudiant.name, prenom: Etudiant.prenom, email: Etudiant.email, address: Etudiant.address }} />
        </CardContent>
        <CardFooter className="flex justify-between">
        </CardFooter>
      </Card>

    </div>
  )
}