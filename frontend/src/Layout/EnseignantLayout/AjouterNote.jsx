import { Button } from "../../components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { axiosClient } from "../../api/axios"

import { useToast } from "@/components/ui/use-toast"
import { LucideLoader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { Textarea } from "../../components/ui/textarea"

const formSchema = z.object({
    note: z.string().min(1).max(50),
    user_id: z.string().min(1).max(50),
    exam_id: z.string().min(1).max(50),
    remarque: z
    .string()
    .min(5, {
      message: "remarque minimum 10.",
    })
    .max(160, {
      message: "remarque maximum 30.",
    }),
})


export default function AjouterNote() {
    const { toast } = useToast()

    const [Etds, setEtds] = useState([])
    const [Exm, setExm] = useState([])


    useEffect(() => {

        axiosClient.get("exams").then(res => {

            setExm(res.data)
        }).catch(err => {

            console.log(err)
        })

        axiosClient.get("users").then(res => {
            setEtds(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])



    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            note: "",
            user_id: "",
            exam_id: "",
        },
    })

    async function onSubmit(values) {
        values.enseignant_id = localStorage.getItem("Ens");

        await axiosClient.post('notes', values)
            .then(res => {
                toast({
                    description: "note etait ajoutée",
                });
                form.reset();
            })
            .catch(error => {
                toast({
                    variant: "destructive",
                    description: "cette note est deja ajoutee",
                });
                console.error("erreur :", error);
            });
    }

    return (
        <div className="m-auto mt-4">
            <Card className="w-full max-w-xl">
                <CardHeader>
                    <CardTitle className="text-2xl">Ajouter un Exam</CardTitle>
                    <CardDescription>
                        Vous pouvez ajouter des examens ici en saisissant le module et la description d'exam
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                            <FormField
                                control={form.control}
                                name="user_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Etudiant</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Choisire un etudiant" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    Etds.map((etd, index) => {
                                                        return <SelectItem value={etd.id} key={index}>{etd.name}</SelectItem>
                                                    })
                                                }
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="exam_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>exam</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Choisire un exam" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    Exm.map((exm, index) => {
                                                        return <SelectItem value={exm.id} key={index}>{exm.nom}</SelectItem>
                                                    })
                                                }
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="note"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>note</FormLabel>
                                        <FormControl>
                                            <Input type="number" max={20} min={0} placeholder="shadcn" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="remarque"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Remarque</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Ajouter votre remarque"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting && <LucideLoader2 className={"mr-2 h-6 w-6 animate-spin"} />}
                                Ajouter</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

