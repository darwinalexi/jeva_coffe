import React, { useEffect } from "react"
import NavBar from "../Components/NavBar"
import { Contact } from "../Components/Contact"
import AOS from 'aos';
import 'aos/dist/aos.css'; // Importa la hoja de estilos para la animación
import {Carrusel} from "../Components/Carrusel"
import { About_buy } from "../Components/About_buy";
export const Main=()=>{
     useEffect(()=>{
        AOS.init({
            duration:1000,
            once:true
        })
     },[])
     
    return(
        <>    
        <div id="#inicio">
            <div>
                <NavBar/>
                <div className="hidden sm:block">
                          <Carrusel/>  
                </div>

                <div className="block sm:hidden">
                  <p className="flex justify-center text-orange-500 text-2xl absolute top-[30%]  ml-10 text-5xl">SI NO SE HACE CON AMOR EL SENTIMIENTO NO DURA</p>
                    <img
                        src="../src/assets/img/imgs.jpeg"
                        alt="imagen alternativa"
                        className="w-full h-full mt-5 opacity-5"
                    />
                    </div>
            </div>
            <h1 className="flex justify-center text-orange-500 text-2xl">Sobre Nosotros</h1>
                <h1 className="text-center text-4xl font-bold font-libre text-[#3c2a21] tracking-wide mt-4 mb-2">
                El ORIGEN
                </h1>
            <div className="grid grid-cols-1 md:grid-cols-2" data-aos="fade-right">
                <div>
                    <img src="../src/assets/img/historia.webp" alt="img"  className="w-[80%] h-[70%]  ml-[12%]"/>
                </div>
                <div>
                    <h1 className="flex justify-center text-3xl p-4 font-bold tracking-wide ">Historia</h1>
                    <p className="p-6 font-poppins">La historia comienza en 1929, cuando Louis Dapples, Presidente del Consejo de 
                        Administración de Nestlé, recibió un pedido muy especial de Brasil. Para combatir el enorme excedente de café en el país, se propuso que Nestlé creara un producto de café que fuera rápido de hacer y que también 
                        redujera la cantidad de desperdicio innecesario de las cosechas de café en Brasil.
                        <br />
                        <br />
                        Inicialmente, la idea era fabricar una tableta de café en forma de cubo, 
                        una que simplemente necesitara agregar agua caliente para una infusión 
                        instantánea. Sin embargo, después de una importante cantidad de investigación, 
                        no se pudo conservar el sabor icónico, por lo tanto el formato de tableta no era 
                        viable. Descartada esta idea, el químico Max Morgenthaler volvió a la mesa de dibujo.</p>
                </div>

                <div data-aos="fade-down-left">
                    <h1 className="flex justify-center text-3xl p-4 font-bold tracking-wide ">El primer café</h1>
                    <p className="p-6 font-poppins">Morgenthaler tuvo la idea de crear un polvo en lugar de un cubo, y 
                        descubrió que el sabor se conservaba mejor cuando se añadían carbohidratos al producto, 
                        produciendo un resultado mucho más similar al de los granos de café. Después de 7 años de 
                        cuidadoso desarrollo, este café soluble se lanzó en Suiza bajo el nombre de JEVACoffee®. 
                        El nuevo producto fue un éxito instantáneo, por así decirlo, y las reservas anuales 
                        se agotaron en solo 2 meses. Para 1940, JEVACoffee® se vendía en más de 30 países, 
                        en todos los continentes. Pero esto fue solo el comienzo de la historia de JEVACoffee® y 
                        todavía quedaban emocionantes desarrollos por delante...</p>
                </div>

                <div>
                    <img src="../src/assets/img/1_cafe.webp" alt="img"  className="w-[80%] h-[70%]  mt-[5%] ml-[12%]"/>
                </div>


                <div>
                    <img src="../src/assets/img/logo_version2.webp" alt="img"  className="w-[80%] h-[80%] p-5 ml-[7%]"/>
                </div>

                <div data-aos="fade-left">
                    <h1 className="flex justify-center text-3xl p-4 font-bold tracking-wide ">Nace una marca</h1>
                    <p className="p-6 font-poppins">JEVACoffee® se encuentra en estantes y mostradores de 
                        todo el mundo. Es una fuente confiable de inspiración, a la que puedes recurrir una y otra vez para 
                        aprovechar al máximo tus mañanas con o sin amigos. 
                        Es casi como si JEVACoffee® siempre hubiera estado allí, listo para ofrecer su rico y 
                        maravilloso sabor, conocido y amado en todo el mundo. Pero no siempre fue así; La historia de JEVACoffee® 
                        es tan inspiradora como cualquier gran taza de café.</p>
                </div>

            </div>
            <About_buy/>
            <Contact/>
        </div>  
        </>   
    )
}