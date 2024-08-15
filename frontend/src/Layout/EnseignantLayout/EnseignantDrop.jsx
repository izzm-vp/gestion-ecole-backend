

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
import { LogOutIcon, Menu, User } from "lucide-react"



export default function EnseignantDrop(){
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
          <Link to={'/enseignant/afficher'}>
          <DropdownMenuItem>
          
          <User style={{marginRight:"5px"}}/> Profile
            
          </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
       <Link to={"/enseignant/exams"}>
       
       <DropdownMenuItem>
          
          Ajouter Exams
         
       </DropdownMenuItem>
       </Link>
       <Link to={"/enseignant/notes"}>
       
       <DropdownMenuItem>
          
          Ajouter Notes
         
       </DropdownMenuItem>
       </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogOut}>
        <LogOutIcon style={{marginRight:"5px"}}/>  Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
 
      </>
    )
}