

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
import { LogOutIcon, Menu, Pointer, StickyNote, User } from "lucide-react"



export default function EtudiantDrop(){
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
       
          <Link to={'/etudiant/afficher'}>
          <DropdownMenuItem>
          
            <User style={{marginRight:"5px"}}/>  Profile
            
          </DropdownMenuItem>
          </Link>
          <Link to={'/etudiant/modifier'}>
          <DropdownMenuItem>

            
          <StickyNote style={{marginRight:"5px"}}/>  Notes
            
          </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogOut}>
         <LogOutIcon style={{marginRight:"5px"}}/> Log out
        </DropdownMenuItem>
       
      </DropdownMenuContent>
    </DropdownMenu>
 
      </>
    )
}