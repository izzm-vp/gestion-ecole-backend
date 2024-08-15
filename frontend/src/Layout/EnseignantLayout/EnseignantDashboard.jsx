import { Outlet } from "react-router-dom";
import DashNavbar from "./Navbar2";
import { Toaster } from "../../components/ui/toaster";




export default function EnseignantLayout(){

  
  
    return (
      <>
      
         <header>
           <DashNavbar/>
         </header>


         <main className="grid w-full items-center">
              <Outlet/>
              <Toaster />
         </main>

      </>
    )
}