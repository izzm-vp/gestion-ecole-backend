import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";



export default function Layout(){
    return <div>
        <header className="relative">
            <Navbar/>
        </header>
        <main>
            <Outlet/>
        </main>
        <footer>
          <Footer/>
        </footer>
    </div>
}