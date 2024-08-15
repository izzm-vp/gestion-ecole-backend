
import { ModeToggle } from "../../components/mode-toggle"
import EtudiantDrop from "./EtudiantDrop"

 


export default function DashNavbar(){

  



    return  <>
    
    <nav className="p-3">
        <div className="container mx-auto flex justify-between items-center">
            
        <h1 className="text-xl lg:text-2xl font-bold mr-5"> Espace Etudiant</h1>

            
            <ul className="flex space-x-4">
                <li>
                  <EtudiantDrop/>
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