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

export default function AfficherEnseignant() {

  const navigate = useNavigate()
  const [Enseignant, setEnseignant] = useState({})

  useEffect(() => {
    if (!window.localStorage.getItem('ACCESS_TOKEN')) {
      navigate('/login');
    }

    const getEnseignant = () => {
      axiosClient.get('/user').then(response => {

        setEnseignant(response.data);
        window.localStorage.setItem("Ens", response.data.id);
      });
    };

    getEnseignant();
  }, []);


  return (
    <div className="container mt-10">
      <Card className="w[350px] sm:max-w-md sm:mx-auto">
        <CardHeader>
          <CardTitle>Hello {Enseignant.nom}</CardTitle>
          <CardDescription>
          ous pouvez ajouter des examens et des notes ici
          </CardDescription>
        </CardHeader>
        <CardContent>
          Nom : {Enseignant.nom}  <br />
          Prenom : {Enseignant.prenom}  <br />
          Email : {Enseignant.email}  <br />

        </CardContent>
        <CardFooter className="flex justify-between">
        </CardFooter>
      </Card>

    </div>
  )
}