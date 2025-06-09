import Imagen from "../Components/Image"
import NavBar from "../Components/NavBar"
import  Cafeimg from "../../src/assets/img/cafe.png"
import Product from "../../src/assets/img/producto.webp"
import { Contact } from "../Components/Contact"

export const Store=()=>{
    return(
        <div>
            <NavBar/>
         <div className="relative w-full">
        <img  alt="Venta de café"
        className="w-full h-full object-cover"
        src={Cafeimg}/>
            <p className="absolute inset-0 flex items-center justify-start text-4xl  tracking-wide     -[12%]font-bold text-orange-500 text-center z-10 t">
                UNA TAZA DE CAFE ES LA RESPUESTA <br/>A MUCHOS INTERROGANTES
            </p>
            </div>
            <div>
                <h1 className="font-bold  flex justify-center   text-3xl">Productos Disponibles </h1>
                <div className="w-[30%]  m-3 rounded-xl        border-b border-b-[#003333] border-t   border-t-[#003333]   border-r   border-r-[#003333] border-l border-l-[#003333]">
                    <img src={Product}    className=" p-8" />
                    <h1 className="flex justify-center font-bold"> Cafe Tostado</h1>
                    <nav>
                        <ul>
                            <li className="m-7            "  >                   Unidades:1 2Lb  </li>
                            <li className="m-7            ">Precio:35.000$</li>
                        </ul>
                    </nav>
                </div>
            </div>
            <Contact/>
        </div>
    )
}