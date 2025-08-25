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

        {isAuthenticated && type==="Empresa_Envios" && (
           <>
                <NavBar/>
                <div>


               <div>
  <p className="flex justify-center text-2xl font-bold text-[#3c2a21] mb-2 dark:text-white">
    Bienvenido a nuestro sistema de JEVACOFFE
  </p>
  <p className="flex justify-center text-xl m-6 text-[#Ff6600">
    Aquí puedes ver tus pedidos entregados y pendientes de entrega
  </p>
  <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-9 m-8">
    <div className="border border-[#003333] rounded-xl p-8 bg-green-50 dark:bg-transparent shadow hover:scale-105 transition-transform">
      <p className="flex justify-center items-center gap-2 text-lg font-semibold text-green-700">
        <span role="img" aria-label="entregado">✅</span>
        Ventas Entregadas: {salesfull}
      </p>
    </div>
    <div className="border border-[#003333] rounded-xl p-8 bg-yellow-50 dark:bg-transparent shadow hover:scale-105 transition-transform">
      <p className="flex justify-center items-center gap-2 text-lg font-semibold text-yellow-700">
        <span role="img" aria-label="pendiente">⏳</span>
        Ventas Pendientes: {salesnoful}
      </p>
    </div>
  </div>
</div>
                <Contact/>
                </div>
            </>
        )}    
            {isAuthenticated && type === "Administrador" && (
              <>
              <NavBar/>
              
                    <div className="w-[100%] sm:grid grid-cols-1 md:grid grid-cols-2 mt-12 min-h-screen  sm:gap-2 md:gap-4">
                        <div className="grid col-span-2 items-center">
                            <p className="text-4xl flex justify-center text-[#Ff6600] dark:text-white">Datos Claves</p>
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
                                    
                        <div className="h-aut0 m-3 flex justify-center items-center">
                            <p className=" text-5xl text-[#3c2a21] font-black dark:text-white">Entre aroma y cifras, tu éxito se prepara aquí.</p>
                        </div>
                                    
                        <div className="grid col-span-2">
                            <div className="border-1 border-[#003333] rounded-lg  p-5 w-full h-auto">
                                <Grafica_ventas/>     
                            </div>
                            
                        </div>
                        <div className="grid col-span-2 bg-[#003333] w-full">
                        <div className="h-full">
                          <Contact/>
                        </div>
                    </div>
                    </div>
            </>          
            )}

        {!isAuthenticated &&(
              <div id="#inicio">
                 <div>
                   <NavBar/>
                  <div className="hidden sm:block">
                          <Carrusel/>  
                  </div>

                <div className="block sm:hidden">
                  <p className="flex justify-center text-[#Ff6600] text-2xl absolute top-[30%]  ml-10 text-5xl">SI NO SE HACE CON AMOR EL SENTIMIENTO NO DURA</p>
                    <img
                        src="../src/assets/img/imgs.jpeg"
                        alt="imagen alternativa"
                        className="w-full h-full mt-5 opacity-5"
                    />
                    </div>
            </div>
            <h1 className="flex justify-center text-[#Ff6600] text-2xl">Sobre Nosotros</h1>
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
            )}

        </>   
    )
}