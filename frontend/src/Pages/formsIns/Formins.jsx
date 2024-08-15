
import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Loader } from "lucide-react"
import { useEffect, useState } from "react"
import { axiosClient } from "../../api/axios"
import { Button } from "../../components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../components/ui/form"

import { cn } from "../../lib/utils"
import { Calendar } from "../../components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../components/ui/popover"
import { Input } from "../../components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select"


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"


const formSchema = z.object({
    name: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    prenom: z.string().min(2, {
        message: "prenom must be at least 2 characters.",
    }),

    password: z.string().min(8, {
        message: "mot de pass must be at least 8 characters.",
    }),
    address: z.string().min(2, {
        message: "prenom must be at least 2 characters.",
    }).max(50),

    email: z.string().email(),
    dateDeNaissance: z.date({
        required_error: "A date of birth is required.",
    }).refine((value) => {
        return !isNaN(new Date(value).getTime());
    }, {
        message: "Invalid date format",
    }).transform((value) => {
        return new Date(value).toISOString().slice(0, 10);
    }),
    enseignant_id: z
        .string({
            required_error: "Please select an email to display.",
        }),
})




export default function FormIns() {

    const [enseignants, setEnseignants] = useState([])


    useEffect(() => {
        axiosClient('/enseignants').then(({ data }) => {
            setEnseignants(data)

            console.log(data)
        }).catch(err => {
            console.log(err)
        })
    }, [])



    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues:{
            name:"",
            prenom:"",
            password:"",
            address:"",
            email:"",
            dateDeNaissance:"",
            enseignant_id:"",

        }
    })

   async function onSubmit(values) {
       await axiosClient.post('/users',values).then(res=>{
            form.reset()
        }).catch(err=>{
            console.log(err)
        })
    }

    return (


        <div
            className="relative  flex-col items-start gap-8"
        >
            <Form {...form}>
                <form className="grid w-full items-start gap-6" onSubmit={form.handleSubmit(onSubmit)}>
                    <fieldset className="grid gap-6 rounded-lg border p-4">
                        <legend className="-ml-1 px-1 text-sm font-medium">Info personnel</legend>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nom</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Votre Nom" {...field} />
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
                                        <Input placeholder="Votre Prenom" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Votre email" {...field} />
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
                                        <Input type="password" placeholder="mot de pass" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid gap-3">
                            <FormField
                                control={form.control}
                                name="enseignant_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Filiére</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="choisir votre filiére" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    enseignants.map((ens) => {
                                                        return <SelectItem value={ens.id}>{ens.specialite}</SelectItem>
                                                    })
                                                }

                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-3 mt-[11px]">

                                <FormField
                                    control={form.control}
                                    name="dateDeNaissance"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Date of birth</FormLabel>
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
                                                                format(field.value, "YYY/MM/dd")
                                                            ) : (
                                                                <span>Pick a date</span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
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
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-3">
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>address</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Votre address" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <Button type="submit" disabled={form.formState.isSubmitting} className="w-60 my-4">
                            
                            {
                                form.formState.isSubmitting && <Loader className="mr-2 h-6 w-6 animate-spin"/>
                            }
                            Submit</Button>
                    </fieldset>

                </form>
            </Form>
        </div>
    )
}
