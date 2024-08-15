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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form"
import { Button } from "../../components/ui/button"
import { Edit2, Loader2, Trash2 } from "lucide-react"
import { useToast } from "../../components/ui/use-toast"
import { ToastAction } from "../../components/ui/toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog"

import { Input } from "../../components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  nom: z.string().min(2, {
    message: "nom must be at least 2 characters.",
  }),
  prenom: z.string().min(2, {
    message: "prenom must be at least 2 characters.",
  }),

  email: z.string().email(),

  address: z.string().min(2, {
    message: "address must be at least 2 characters.",
  }),
  phone: z.string().min(2, {
    message: "phone must be at least 2 characters.",
  }),
})




export default function AfficherEnseignants() {


  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
      address:"",
      prenom:"",
      email:"",
      phone:"",
    },
  })
  async function onSubmit(values, id) {
    await axiosClient.put('/enseignants/' + id, values).then(res => {


      getEns()
      toast({
        title: "Edited !",
        description: "Enseignant était Modifiée !",
      })
      form.reset()
    })
  }



  const [allEns, setAllEns] = useState([])
  const { toast } = useToast()


  useEffect(() => {

    getEns()
  }, [])


  const getEns = async () => {
    await axiosClient.get("/enseignants").then(({ data }) => {
      setAllEns(data)
    }).catch(({ errors }) => {
      console.log(errors)
    })
  }

  const DeleteEns = async (id) => {
    await axiosClient.delete('/enseignants/' + id).then(res => {
      console.log(res)

      toast({
        title: "Success !",
        description: "Enseignant etait supprimer !",
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
          {res.nom}
        </TableCell>
        <TableCell> {res.prenom}</TableCell>
        <TableCell>{res.email}</TableCell>
        <TableCell>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Edit2 />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit((values) => onSubmit(values, res.id))} className="space-y-8">

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <FormField
                        control={form.control}
                        name="nom"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>nom</FormLabel>
                            <FormControl>
                              <Input placeholder={res.nom} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <FormField
                        control={form.control}
                        name="prenom"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>prenom</FormLabel>
                            <FormControl>
                              <Input placeholder={res.prenom} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>email</FormLabel>
                            <FormControl>
                              <Input placeholder={res.email} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>addresse</FormLabel>
                            <FormControl>
                              <Input placeholder={res.address} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>phone</FormLabel>
                            <FormControl>
                              <Input placeholder={res.phone} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>




                  <DialogFooter>
                    <Button type="submit" disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting && <Loader2 className="mr-2 animate-spin" />}
                      Update</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </TableCell>
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
      <TableHeader className="p-10">
        <TableRow>
          <TableHead className="w-[100px]">Nom</TableHead>
          <TableHead>Prenom</TableHead>
          <TableHead>email
          </TableHead>
          <TableHead>
            Modifier
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