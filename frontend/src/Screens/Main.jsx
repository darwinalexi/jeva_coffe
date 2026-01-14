import  { useEffect, useState } from "react"
import NavBar from "../Components/NavBar"
import { Contact } from "../Components/Contact"
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import {Carrusel} from "../Components/Carrusel"
import { About_buy } from "../Components/About_buy";
import GraficaProductos from "../Components/Grafica_Productos"
import Grafica_ventas from "../Components/Grafic";
import GraficaCliente from "../Components/Grafica_Clientes";
import GraficaVentas from "../Components/Grafica_ventas";
import {Link} from "react-router-dom"
import axiosClient from "../utils/axiosClient";
import img from "../assets/img/imgs.jpeg";
import img2 from "../assets/img/historia.webp";
import "driver.js/dist/driver.css";
import { Grafica_de_unidadades_disponibles_de_cada_producto } from "../Components/Grafic_Number_Product";

export const Main=()=>{
  const [type, setType] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [salesfull, setfull]= useState([]);
  const [salesnoful, setnofull]= useState([]);
  useEffect(() => {
    const datalocal = JSON.parse(localStorage.getItem('usuario'));
    if (datalocal && datalocal.tipo) {
      setType(datalocal.tipo);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);


 




     
const show_client = async () => {
      try {
        const res = await axiosClient.get("/contar_ventas_entregadas");
        const res2 = await axiosClient.get("/contar_ventas_no_entregadas");

          setfull(res.data.Ventas_Entregadas),
          setnofull(res2.data.Ventas_No_Entregadas);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };


    useEffect(()=>{
         show_client();
    },[])

    
    return(
        <>     
            {isAuthenticated && type === "Administrador" && (
              <>
              <NavBar/>  
              
              
                    <div className="w-[100%] sm:grid grid-cols-1 md:grid grid-cols-2 mt-12 min-h-screen  sm:gap-2 md:gap-4">
                        <div className="grid col-span-2 items-center">
                            <p className="text-4xl flex justify-center text-[#Ff6600] dark:text-white mt-5">Datos Claves</p>
                        </div>
                        <Link to="/clientes" className="h-aut0 m-3 hover: cursor-pointer ">
                            <GraficaCliente />
                        </Link >
     
                        <Link to="/tienda" className="h-aut0 m-3">
                            <GraficaProductos className=""/>
                        </Link>
                                    
                        <div className="h-aut0 m-3">
                            <GraficaVentas  className="p-4"/>
                        </div>
                                    
                        <div className="h-auto m-3 flex justify-center items-center">
                            <p className=" text-5xl text-[#3c2a21] font-black dark:text-white">Entre aroma y cifras, tu éxito se prepara aquí.</p>
                        </div>
                         <div className="h-auto m-3 col-span-2 w-[97%]">
                        <Grafica_de_unidadades_disponibles_de_cada_producto/>
                        </div>
                                    
                        <div className="grid col-span-2">
                            <div className="border-1 border-[#003333] rounded-lg  p-5 w-full h-auto">
                                <Grafica_ventas/>     
                            </div>
                            
                        </div>
                        <div className="grid col-span-2 bg-[#003333] w-full">
                        <div className="h-full">
                          <Contact id="pie_pagina"/>
                        </div>
                    </div>
                    </div>
            </>          
            )}

      {(!isAuthenticated || type === "Cliente") && (
              <div id="#inicio">
                 <div>
                    
                      <NavBar />
                  
                  <div className="hidden sm:block mt-[4%]">
                          <Carrusel/>  
                  </div>

                <div className="block sm:hidden">
                  <p className="flex justify-center text-[#Ff6600]  dark:text-white text-2xl absolute top-[30%]  ml-10 text-5xl z-10 font-semibold">SI NO SE HACE CON AMOR EL SENTIMIENTO NO DURA</p>
                    <img
                        src={img}
                        alt="imagen alternativa"
                        className="w-full h-full mt-[10%] opacity-80 dark:opacity-50"
                    />
                    </div>
            </div>
            <h1 className="flex justify-center text-[#Ff6600] text-2xl">Sobre Nosotros</h1>
                <h1 className="text-center text-4xl font-bold font-libre text-[#3c2a21] tracking-wide mt-4 mb-2">
                El ORIGEN
                </h1>
            <div className="grid grid-cols-1 md:grid-cols-2" data-aos="fade-right">
                <div>
                    <img src={img2} alt="img"  className="w-[80%] h-[70%]  ml-[12%]"/>
                </div>
                <div>
                    <h1 className="flex justify-center text-3xl p-4 font-bold tracking-wide ">Historia</h1>
                    <p className="p-6 font-poppins">JEVA Coffee surgió del anhelo de ofrecer al mundo la esencia del café colombiano. Inspirados e impulsados por la majestuosidad de las montañas de Colombia, donde durante generaciones las familias de campesinos han cultivado café al máximo con el amor por la tierra, decidimos crear una marca que aglutinara todo este legado. Desde sus comienzos, JEVA Coffee ha cooperado con los caficultores locales, de la mano de los mismos, seleccionando los mejores granos cultivados mediante prácticas responsables. Cada taza que servimos es la expresión de un esfuerzo de manos de campesinos, una muestra de la riqueza del suelo cafetero y de la tradición que nos hace volver a nuestras raíces. Nuestro compromiso trasciende la bebida: queremos generar experiencias, momentos de unión, disfrute y placer, por esta razón cuidamos el proceso absolutamente todo, desde la siembra a la taza— queremos que la frescura, calidad y un acentuado sabor sean la unión del proceso. JEVA Coffee es más que café. Es cultura, es una familia, es un mundo de pasión que se hace aroma.</p>
                </div>

               
            </div>
            <About_buy/>
            <Contact id="pie_pagina"/>
        </div>
            )}

        </>   
    )
}