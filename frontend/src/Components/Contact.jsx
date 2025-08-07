import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Politices_private } from "./Politices_ans_private"
import { 
  faFacebook, 
  faInstagram, 
  faWhatsapp
} from '@fortawesome/free-brands-svg-icons';
import {Link} from "react-router-dom"
import logo from "../assets/img/logo.jpg"
export const Contact=()=>{

  const whattasap=()=>{
    const numero="573138518000"
    const mensaje="!Hola! Jeferson Gomez quiero mas información de los productos de la plataforma jevacoffe"
    const url=`https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`
    window.open(url,"_blank")
  }


  return(
        <>
 <footer className="bg-[#003333] text-white py-10">
      <div className="container mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-6">
        
        <div>
          <h2 className="text-xl font-bold mb-4 text-orange-400">JEVA Coffee</h2>
          <p className="text-sm">
            Café artesanal colombiano con aroma, pasión y tradición. Gracias por preferirnos.
          </p>
        </div>

    
        <div>
         <img src={logo} alt="" />
          </div>

    
        <div>
          <h3 className="text-lg font-semibold mb-3 text-orange-400">Contacto</h3>
          <ul className="text-sm space-y-2">
            <li>📍 Bogotá, Colombia</li>
            <li onClick={whattasap}>📞 +57 300 123 4567</li>
            <li>✉️ contacto@jevacoffee.com</li>
          </ul>
        </div>


       

      <div>
          <h3 className="text-lg font-semibold mb-3 text-orange-400">Síguenos</h3>
          <div className="flex gap-4">
            <a  className="hover:text-orange-400 transition"><FontAwesomeIcon icon={faFacebook} /> Facebook</a>
            <a  className="hover:text-orange-400 transition"><FontAwesomeIcon icon={faInstagram} /> Instagram</a>          
          </div>


           <div>
          <h3 className="text-lg font-semibold mb-3 text-orange-400">Politicas de Datos</h3>
          <div className="flex gap-4">
            <Link to="/politicas_datos" className="hover:text-orange-400 transition">Politicas de Privacidad</Link>
          </div>
        </div>
     </div>

          <div className="">
            <div className="flex justify-end relative top-20" onClick={whattasap}>
              <p className="mr-6">Escribenos a nuestro Whatssap:</p>
            <FontAwesomeIcon icon={faWhatsapp} className="size-8 hover:size-16 transition-all hover:cursor-pointer"/>
            </div>
          </div>
      </div>
      

      <div className="text-center text-sm mt-10 text-gray-400">
        © {new Date().getFullYear()} JEVA Coffee. Todos los derechos reservados.
      </div>
    </footer>

        </>
    )
}