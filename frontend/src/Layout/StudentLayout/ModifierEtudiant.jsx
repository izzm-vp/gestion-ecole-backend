
import { axiosClient } from "../../api/axios"
import { Badge } from "../../components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"
import { useEffect, useState } from "react"

export function ModifierEtudiant() {


  const [Etd, setEtd] = useState([])

  useEffect(() => {


    const id = Number(localStorage.getItem("Etd"))

    axiosClient.get('/notes/' + id).then(res => {

      setEtd(res.data.exams)
    }).catch(err => {

      console.log(err)
    })
  }, [])
  return (
    <div className="p-10">
      <Card className="xl:col-span-2">
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Notes des examens</CardTitle>
            <CardDescription>
            Les notes de vos examens.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Module</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Remarque</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Etd.length === 0 ? (<TableRow>
                <TableCell colSpan={4}>
                  <div className="font-lg text-lg text-center text-destructive">Pas des Notes</div>
                </TableCell>
               
              </TableRow>) :
                Etd.map((note, index) => {

                  return (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="font-medium">{note.exam.module}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{note.exam.nom}</div>
                      </TableCell>
                      <TableCell>
                        <Badge className="text-xs px-4 py-3" variant={Number(note.note) < 10 ? "destructive" : "default"}>
                          {note.note}
                        </Badge>

                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{note.remarque}</div>
                      </TableCell>
                    </TableRow>
                  )
                })
              }

            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
