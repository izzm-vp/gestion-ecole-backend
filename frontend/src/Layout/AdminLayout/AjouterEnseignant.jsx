import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {Button} from '../../components/ui/button'
import {Input} from '../../components/ui/input'
import { Form, FormControl,  FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form"
import { axiosClient } from "../../api/axios"
import {LucideLoader2} from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "../../components/ui/card"  
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "../../components/ui/popover"
import { format } from "date-fns"
import { Calendar } from "../../components/ui/calendar"
import { CalendarX } from "lucide-react"
import { cn } from "../../lib/utils"
import { useToast } from "../../components/ui/use-toast"



const formSchema = z.object({
  nom:z.string().min(5).max(60),
  prenom:z.string().min(5).max(60),
  email: z.string().min(10).max(50),
  phone:z.string().max(10).min(10),
  dateDeNaissance:z.date(),
  specialite:z.string(),
  address:z.string().min(5).max(60),
  password: z.string().min(8).max(50),
})




export default function AjouterEnseignant(){

  const { toast } = useToast()
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues:{
          nom:"",
          prenom:"",
          email:"",
          phone:"",
          dateDeNaissance:"",
          specialite:"",
          address:"",
          password: "",
        }
      })

      const handleSub = async (values) => {
        const dt=format(values.dateDeNaissance,"yyyy-MM-dd")
        values.dateDeNaissance=dt

      await axiosClient.post('/enseignants',values).then(res=>{
        
        form.reset()

        toast({
          title: "Ajouter avec success",
          description: "enseignant etait ajoutee !",
        })
      }).catch(({response})=>{
        Object.entries(response.data.errors).forEach((feild)=>{
          const [feildName,errorMessage]=feild
            form.setError(feildName,{
              message:errorMessage.join()
            })
        })
      })
      };
      

    return (
      <div className="relative mt-[310px]">

      <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
     <Card className="lg:w-[450px] md:w-[550px] sm:w-[100px]">
       <CardHeader className="space-y-1">
         <CardTitle className="text-2xl">Ajouter un enseignant</CardTitle>
         <CardDescription>Cree un enseignant qui n'existe pas.</CardDescription>
       </CardHeader>
       <CardContent>
       <Form {...form} >
        <form onSubmit={form.handleSubmit(handleSub)} className="space-y-9">
           <div className="flex">
           <FormField
            control={form.control}
            name="nom"
            render={({ field }) => (
              <FormItem className={'mr-20'}>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input type={"text"} placeholder="Nom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
              
            )}
          />
          <FormField
            control={form.control}
            name="prenom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prenom</FormLabel>
                <FormControl>
                  <Input type={"text"} placeholder="prenom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
              
            )}
          />
           </div>
           
          <div className="flex">
              
           <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className={'mr-20'}>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type={"phone"} placeholder="phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
              
            )}
          />

          <FormField
            control={form.control}
            name="specialite"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Specialite</FormLabel>
                <FormControl>
                <Select  onValueChange={field.onChange}>
           <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Spacialite" />
           </SelectTrigger>
          <SelectContent>
            <SelectItem value="dev FS">Full Stack</SelectItem>
            <SelectItem value="dev mobile">Mobile</SelectItem>
            <SelectItem value="dev backend">backend</SelectItem>
            <SelectItem value="dev frontend">frontend</SelectItem>
          </SelectContent>
       </Select>

                </FormControl>
                <FormMessage />
              </FormItem>
              
            )}
          />

               



          </div>


           <div className="flex">

           <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className={'mr-20'}>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type={"email"} placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
              
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input type={"password"} placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
              
            )}
          />
           </div>


         <div className="flex">
         <FormField
          control={form.control}
          name="dateDeNaissance"
          render={({ field }) => (
            <FormItem className="flex flex-col mr-8 mt-2">
              <FormLabel>Date de naissance</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
        
                        format(field.value, "yyyy-MM-dd")
                      ) : (
                        <span>Choisir une Date</span>
                      )}
                      <CalendarX className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />

<FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>address</FormLabel>
                <FormControl>
                  <Input type={"text"} placeholder="Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
              
            )}
          />
         </div>

          <Button disabled={form.formState.isSubmitting} type="submit" className={'w-full'}>
            {form.formState.isSubmitting && <LucideLoader2 className={"mr-2 h-6 w-6 animate-spin"}/>}
            Ajouter
          </Button>
        </form>
      </Form>

       </CardContent>
     </Card>
   </div>

      </div>
       
       
    )
}