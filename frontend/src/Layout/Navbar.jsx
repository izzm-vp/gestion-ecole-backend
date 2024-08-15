import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "../components/ui/sheet"
import {Button} from "../components/ui/button"
import { Menu } from "lucide-react";
import { ModeToggle } from "../components/mode-toggle"
import Logo from "./Logo";

export default function Navbar() {



  return (
    <nav className="opacity-50 shadow">
      <div className="sticky top-0 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
            <Link
                  to="/"
                 
                >
                   <Logo/>
                </Link>
             
            </div>
            <div className="hidden md:block z-40">
              <div className="ml-10 flex items-baseline space-x-4">
               
                <Link
                  to="/login"
                  className="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium duration-500"
                >
                  Se connecter
                </Link>
                <Link
                  to="/inscription"
                  className="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium duration-500"
                >
                  inscription
                </Link>
              </div>
            </div>
          </div>
          
         <div className="md:hidden block">
         <Sheet>
            <SheetTrigger>
               <Button variant={'outline'}>
                <Menu/>
               </Button>
            </SheetTrigger>
            <SheetContent side='top'>
            <SheetHeader>
               <SheetDescription>
               <div className="z-40">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/login"
                  className="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Se connecter
                </Link>
                <Link
                  to="/inscription"
                  className="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Inscription
                </Link>


               <div className=" px-3 py-2">
                
               <ModeToggle/>  
                </div>        
              </div>
            </div> 
               </SheetDescription>
            </SheetHeader>
            </SheetContent>
         </Sheet>
         </div>

           <div className="hidden md:block">

         
              <ModeToggle/> 
           </div>
        </div>
  
      </div>

    
      
    </nav>
  );
}
