import { Outlet } from "react-router-dom";
import DashNavbar from "./Navbar2";
import { Toaster } from "../../components/ui/toaster"



export default function AdminLayout(){

  
  
    return (
      <>
      
         <header>
           <DashNavbar/>
         </header>


         <main className="grid w-full items-center">
              <Outlet/>
           
         </main>
         <Toaster/>
      </>
    )
}