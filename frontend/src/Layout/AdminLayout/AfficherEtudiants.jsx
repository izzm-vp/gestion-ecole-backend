import { useEffect, useState } from "react"
import { axiosClient } from "../../api/axios"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"
import { Button } from "../../components/ui/button"
import { Trash2 } from "lucide-react"
import { useToast } from "../../components/ui/use-toast"
import { ToastAction } from "../../components/ui/toast"



export default function AffEtd() {

  const [allEns, setAllEns] = useState([])
  const { toast } = useToast()


  useEffect(() => {

    getEns()
  }, [])


  const getEns = async () => {
    await axiosClient.get("/users").then(({ data }) => {
      setAllEns(data)
    }).catch(({ errors }) => {
      console.log(errors)
    })
  }

  const DeleteEns = async (id) => {
    await axiosClient.delete('/users/' + id).then(res => {
      console.log(res)

      toast({
        title: "Bien joue !",
        description: "Etudiant etait supprimer !",
      })
      getEns()
    }).catch(err => {
      console.log(err)
    })
  }

  const TabRows = allEns.map((res, i) => {
    return (
      <TableRow key={i}>
        <TableCell className="font-medium">
          {res.name}
        </TableCell>
        <TableCell> {res.prenom}</TableCell>
        <TableCell>{res.email}</TableCell>

        <TableCell>
          <Button variant="destructive" onClick={() => {
            toast({
              title: "Attention !",
              description: "Voulez vous vraiment supprimer ce champ ?",
              action: <ToastAction onClick={() => DeleteEns(res.id)} altText="Supprimer">Supprimer</ToastAction>
            })
          }}>
            <Trash2 />
          </Button>
        </TableCell>
      </TableRow>
    )
  })
  return <div className="container">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Nom</TableHead>
          <TableHead>Prenom</TableHead>
          <TableHead>email
          </TableHead>
          <TableHead>
            Supprimer
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {TabRows}
      </TableBody>
    </Table>

  </div>
}