

import { Button } from "../../components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
  } from "../../components/ui/dropdown-menu"

import { Link, useNavigate } from "react-router-dom"
import { axiosClient } from "../../api/axios"
import {  LogOutIcon, Menu, User } from "lucide-react"



export default function AdminDrop(){
    const navigate= useNavigate()
    const handleLogOut= async ()=>{
  
      const conf=confirm("Voulez Vous Vraiment logout ?")
  
      if(conf){
       await axiosClient.post('/logout').then(res=>{
        navigate('/')
        window.localStorage.removeItem('ACCESS_TOKEN')
       }).catch((data)=>{
        console.log(data.errors)
       })
      }
    }  
  
    return (
      <>

<DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Menu/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel> Gérer mon compte
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to={'/admin/afficher'}>
          <DropdownMenuItem>
          
              <User style={{marginRight:"5px"}}/> Profile
            
          </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
          <Link to="/admin/ajouterEnseignant">
          <DropdownMenuItem>
          
          Ajouter Enseignant
         
      
       </DropdownMenuItem>
          </Link>
          <Link to='/admin/géreEnseignants'>
          <DropdownMenuItem>
          
            Afficher Les Profs
         
       </DropdownMenuItem>
          </Link>
          <Link to='/admin/géreEtudiants'>
          <DropdownMenuItem>
          
            Afficher Les Etudiants
         
       </DropdownMenuItem>
          </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogOut}>
             <LogOutIcon className="mr-2"/> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
 
      </>
    )
}