"use client"
import { useEffect } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {Button} from '../components/ui/button'
import {Input} from '../components/ui/input'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form"
import { axiosClient } from "../api/axios"
import {useNavigate} from 'react-router-dom'
import {LucideLoader} from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";


const formSchema = z.object({
  email: z.string().email().min(10).max(50),
  password: z.string().min(8).max(50),
})



export default function Login(){

    const navigate= useNavigate()
    useEffect(()=>{
      if(window.localStorage.getItem("ACCESS_TOKEN")){
          navigate("/etudiant/afficher")
           }


     },[])
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues:{
            email:"",
            password:"",
        }
      })


      const handleSub = async (values) => {
        await axiosClient.get("/sanctum/csrf-cookie",{
          baseURL: import.meta.env.VITE_BACKEND_URL
        })
        await axiosClient
          .post("/login", values)
          .then(({status,data}) => {
            if (status === 200) {
              const {role}=data.user
              window.localStorage.setItem('ACCESS_TOKEN','test')
              switch (role){
                case 'etudiant':
                  navigate("/etudiant/afficher");
                break;
                case 'admin':
                  navigate("/admin/afficher");
                break;
                case 'enseignant':
                  navigate("/enseignant/afficher");
                break;
              }
           
             
              
            }
          })
          .catch((err) => {
            form.setError('email', {
              message: err.response.data.message
            });
            form.setError('password', {
              message: err.response.data.message
            });
          });
      };
      
      
      
    return (<>
        
       <div className="relative mt-72">

       <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Connectez vous a votre compte.</CardDescription>
        </CardHeader>
        <CardContent>
        <Form {...form} >
        <form onSubmit={form.handleSubmit(handleSub)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
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
                <FormDescription>
                  Ajouter Votre Mot de passe
                </FormDescription>
                <FormMessage />
              </FormItem>
              
            )}
          />
          <Button disabled={form.formState.isSubmitting} type="submit" className="w-full">
            {form.formState.isSubmitting && <LucideLoader className={"mr-2 h-6 w-6 animate-spin"}/>}
            Se Connecter
          </Button>
        </form>
      </Form>
        </CardContent>
      </Card>
    </div>

       </div>
    </> )
}