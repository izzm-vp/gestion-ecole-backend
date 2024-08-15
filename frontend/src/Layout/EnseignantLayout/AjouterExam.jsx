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
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { axiosClient } from "../../api/axios"

import { useToast } from "@/components/ui/use-toast"
import { LucideLoader2 } from "lucide-react"

import { Textarea } from "../../components/ui/textarea"

const formSchema = z.object({
    module: z.string().min(2).max(50),
    nom: z.string().min(2).max(50),
})


export default function AjouterExam() {
    const { toast } = useToast()



    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            module: "",
            nom: ""
        },
    })

    async function onSubmit(values) {
        values.enseignant_id = localStorage.getItem("Ens");
    
        await axiosClient.post('exams', values)
            .then(res => {
                toast({
                    description: "exam ajoutée",
                });
                form.reset(); 
            })
            .catch(error => {
                console.error("erreur :", error);
            });
    }
    
    return (
        <div className="m-auto mt-10">
            <Card className="w-full max-w-sm">
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
                                name="module"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>module</FormLabel>
                                        <FormControl>
                                            <Input placeholder="shadcn" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="nom"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Veuillez inclure le numéro et le semestre de l'examen"
                                                className="resize-none"
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

