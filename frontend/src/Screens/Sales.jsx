
import { useState } from "react"
import { Link } from "react-router-dom";
import GraficaVentas from "../Components/Grafica_ventas"
import NavBar from "../Components/NavBar"
import axiosClient from "../utils/axiosClient";
import { useEffect } from "react";
import { baseurl } from "../utils/data";
import SearchBar from "../Components/Searchar"
import { Contact } from "../Components/Contact";

export const Sales=()=>{
    const [sales, setsale]=useState([]);
    const [searcher, setsearcher]= useState("");
    const [estadoFiltro, setEstadoFiltro] = useState("Todos");
    const [index, setIndex]= useState(0);
    const [type, settype]= useState("");
    const [detailsales, setdetailes]= useState([]);
    const [openmodal, setmodal]= useState(false)
    const seesales=async()=>{
        try {
            const See= await axiosClient.get("/listar_ventas");
            setsale(See.data)
            console.log("data", See.data)
        } catch (error) {
            console.log(error)
        }
    }


    const  formatDate=(fechaIso)=> {
  const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(fechaIso).toLocaleDateString('es-CO', opciones);
}


    useEffect(()=>{
        const datalocal= JSON.parse(localStorage.getItem("usuario"));
        const type= datalocal.tipo;
        settype(type);
        seesales();
    },[])

    const filterdata=()=>{
        return sales.filter((ventas)=>{
            const estado=ventas.estado.toLowerCase();
            const cliente= ventas.nombre_cliente.toLowerCase();
            const buscar= searcher.toLowerCase();
            
            const buscliente= cliente.includes(buscar);
            const estadofilter= estadoFiltro=="Todos" || estado=== estadoFiltro.toLowerCase();
            return buscliente && estadofilter;
        })
    }
    return(
        <div className="dark:bg-black">
            <NavBar/>
            <div className="sm:grid grid-cols-1 md:grid grid-cols-2">
                <div className="col-span-2 mt-12 font-bold">
                    <p className="flex justify-center text-[#3c2a21] text-2xl font-poppins p-5 dark:text-white">Nuestras Estadisticas de Ventas</p>
                </div>
                <div><GraficaVentas/></div>
                <div className="flex justify-center items-center p-24">
                    <p className="text-5xl font-bold uppercase text-[#5E2419]">Con Cada Entrega que hacemos se va una pizca de Nuestra escencia </p>
                </div>
            </div>
            <h1 className="flex justify-center text-2xl text-[#Ff6600] m-5">Datos Importantes de Nuestras Ventas</h1>
              <SearchBar
                value={searcher}
                onChange={(e)=>setsearcher(e.target.value)}
                placeholder="Buscaa Ventas Por Cliente"
            />

            <div className="flex justify-center gap-4 my-4">
  <select
    className=" rounded px-3 py-1 bg-[#003333] dark:bg-[#5E2419] text-white"
    value={estadoFiltro}
    onChange={(e) => setEstadoFiltro(e.target.value)}
  >
    <option value="Todos">Todos</option>
    <option value="Por Entregar">Por Entregar</option>
    <option value="Entregado">Entregado</option>
  </select>
</div>

            <div className="sm:grid grid-cols-1 lg:grid grid-cols-2  md:grid grid-cols-3 m-9">
               {filterdata().length>0?(
                 filterdata().map(item=>{
                    const imagenes=JSON.parse(item.imagen || "[]"); 

                    

                 return(
                     <div  className="border-1  border-[#003333] rounded-xl m-4 hover:shadow-green-900 shadow-lg h-auto">
                        <p className="flex justify-center"><strong>Nombre del Producto: </strong>{item.nombre_producto}</p>
                        <img className=" rounded-lg  p-8  h-[63%] w-auto" src={`${baseurl}/img/${imagenes[index]}`} alt={imagenes[index]} />
                        <p className="flex justify-center"><strong>Nombre Del Cliente:</strong>{item.nombre_cliente}</p>
                       
                        {item.apellidos.length>0 &&(
                            <p className="flex justify-center"><strong>Apellido Del Cliente:</strong>{item.apellidos}</p>
                        )}
                       
                        <p className="flex justify-center"><strong>Estado : </strong>{item.estado}</p>
                        <Link to={`/ventas/${item.id}`} className="flex justify-center border-1 rounded-xl border-[#Ff6600] hover:bg-[#Ff6600] p-1 m-2">Detalles de la venta</Link>
                        </div>
                 )
                })
               ):(
                    <p  className="flex justify-center text-2xl text-red-600">No Tenemos ventas de clientes con nombre:  {searcher}</p>
               )}
               
               
            </div>
                <Contact/>
        </div>
    )
}