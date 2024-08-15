 
import { RouterProvider } from "react-router-dom"
import { route } from "./Router/route"
import { ThemeProvider } from "./components/theme-provider"
function App() {
  

  return (
    <div>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={route}/>
        </ThemeProvider>
       
    </div>
     
  )
}

export default App
