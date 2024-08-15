
import { ModeToggle } from "../../components/mode-toggle"
import AdminDrop from "./AdminDrop"

 


export default function DashNavbar(){

  



    return  <>
    
    <nav className="p-3">
        <div className="container mx-auto flex justify-between items-center">
            
            <h1 className="text-xl lg:text-2xl font-semibold mr-5"> Espace Admin</h1>

            
            <ul className="flex space-x-4">
                <li>
                  <AdminDrop/>
                </li>
                <li>
                  <ModeToggle/>
                </li>
            </ul>

           
        </div>
    </nav>
    <hr />
    </>
}