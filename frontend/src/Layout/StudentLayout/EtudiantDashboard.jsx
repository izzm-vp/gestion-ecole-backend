import { Outlet } from "react-router-dom";
import DashNavbar from "./Navbar2";




export default function EtudiantLayout(){

  
  
    return (
      <>
      
         <header>
           <DashNavbar/>
         </header>


         <main className="grid w-full items-center">
              <Outlet/>
           
         </main>

      </>
    )
}