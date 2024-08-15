import { axiosClient } from "../../api/axios"
import { Input } from "../../components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog"
import { Button } from "../../components/ui/button"
import { Loader2 } from "lucide-react"


const formSchema = z.object({
  name: z.string().min(2, {
    message: "nom must be at least 2 characters.",
  }),
  prenom: z.string().min(2, {
    message: "prenom must be at least 2 characters.",
  }),
  email: z.string().email(),
  address: z.string().min(2, {
    message: "address must be at least 2 characters.",
  }),
})

export function EtdPop({ Etd }) {

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      prenom: "",
      email: "",
      address: "",
    },
  })

  async function onSubmit(values, id) {
    await axiosClient.put('/users/' + id, values).then(res => {
      form.reset({ name: '',prenom:"" })
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="my-4 mr-3">
          Update
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
          Apportez des modifications à votre profil ici. Click sur Update.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((values) => onSubmit(values, Etd.id))} className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>nom</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder={Etd.nom}/>
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
                        <Input {...field} placeholder={Etd.prenom}/>
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
                        <Input {...field} placeholder={Etd.email}/>
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
                        <Input {...field} placeholder={Etd.address}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && <Loader2 className="animate-spin"/>}
                Update</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
