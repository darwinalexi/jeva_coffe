import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWhatsapp} from '@fortawesome/free-brands-svg-icons';
import {Link} from "react-router-dom";
import logo from "../assets/img/logo-removebg.png";
import MapaColombia from "./Maps/Map";
export const Contact=()=>{

  const whattasap=()=>{
    const numero="573138518000"
    const mensaje="!Hola! Jeferson Gomez quiero mas información de los productos de la plataforma jevacoffe"
    const url=`https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`
    window.open(url,"_blank")
  }


  return(
        <>
 <footer className="bg-[#003333] text-white py-10 dark:bg-[#5E2419] ">
      <div className="container mx-auto px-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
      
        <div className="sm: relative left-[50%] md:left-0 ">
          <img src={logo} alt="Logo" />
          <p className="flex justify-center">Facebook</p>
          <p className="flex justify-center">Instagram</p>
        </div>

<div className="col-span-2 ">
            <h1 className="p-5">Donde Estamos</h1>
         <div className="-z-50">
          <MapaColombia />
         </div>
          </div>

           <div>
          <h3 className="text-lg font-semibold mb-3 text-[#Ff6600]">Politicas de Datos</h3>
          <div className="flex gap-4">
            <Link to="/politicas_datos" className="hover:text-[#Ff6600] transition">Politicas de Privacidad</Link>
          </div>
        </div>
     </div>

      <div className="relative left-[72%] sm:relative sm:left-[83%]  w-12">
            <div className="flex justify-end relative top-[80%] w-20 hover:cursor-pointer  hover:w-[18%]  group transition-all" onClick={whattasap}>
              <p className="hidden group-hover:block">Escribenos a nuestro Whatssap:</p>
            <FontAwesomeIcon icon={faWhatsapp} className="size-16 hover:size-16 transition-all hover:cursor-pointer"/>
            </div>
          </div>

      <div className="text-center text-sm mt-10 text-gray-400">
        © {new Date().getFullYear()} JEVA Coffee. Todos los derechos reservados.
      </div>
    </footer>

        </>
    )
}