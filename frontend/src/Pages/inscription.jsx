import FormIns from "./formsIns/Formins";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "../components/ui/card"



export default function Inscription() {


    return <div>
        <div className="py-24 sm:py-4">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-[1px] ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
                    <div className="p-8 sm:p-8 lg:flex-auto">
                        <div className="flex items-center gap-x-4">
                            <FormIns />
                        </div>

                    </div>
                    <div className="group w-[600px] h-[770px] p-10">
                        <div className="relative h-full lg:rounded-l-2xl rounded-2xl bg-muted">
                            <div
                                className="w-full h-full lg:rounded-l-2xl rounded-2xl bg-zinc-900"
                            />
                            
                        </div>
                    </div>
                </div>



            </div>

        </div>
    </div>
}