
import { useState } from "react"
import GraficaVentas from "../Components/Grafica_ventas"
import NavBar from "../Components/NavBar"
import axiosClient from "../utils/axiosClient";
import { useEffect } from "react";
import { baseurl } from "../utils/data";
import SearchBar from "../Components/Searchar"
import { Contact } from "../Components/Contact";
import { button } from "@nextui-org/theme";
import Swal from "sweetalert2";
export const Sales=()=>{
    const [sales, setsale]=useState([]);
    const [searcher, setsearcher]= useState("");
const [estadoFiltro, setEstadoFiltro] = useState("Todos");

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
const entregar=async(id)=>{
    try {
        const see= await axiosClient.put(`/entregar/${id}`);
        if (see.status===200) {
            Swal.fire({
                icon:'success',
                text:see.data.mensaje
            })
            window.location.reload();
        }
    } catch (error) {
        console.lohg(error)
    }
}

    useEffect(()=>{
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
        <div>
            <NavBar/>
            <div className="sm:grid grid-cols-1 md:grid grid-cols-2">
                <div className="col-span-2">
                    <p className="flex justify-center text-[#3c2a21] text-2xl font-poppins p-5 dark:text-white">Nuestras Estadisticas de Ventas</p>
                </div>
                <div><GraficaVentas/></div>
                <div className="flex justify-center items-center p-24">
                    <p className="text-2xl font-bold ">Con Cada Entrega que hacemos se va una pizca de Nuestra escencia cafétera</p>
                </div>
            </div>
            <h1 className="flex justify-center text-2xl text-[#Ff6600]">Datos Importantes de Nuestras Ventas</h1>
              <SearchBar
                value={searcher}
                onChange={(e)=>setsearcher(e.target.value)}
                placeholder="Buscaa Ventas Por Cliente"
            />

            <div className="flex justify-center gap-4 my-4">
  <select
    className="border border-[#003333] rounded px-3 py-1 dark:bg-[#003333]"
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
                 filterdata().map(item=>(
                  <div className="border-1 border-[#003333] rounded-xl m-4">
                      <p className="flex justify-center"><strong>Nombre del Producto: </strong>{item.nombre_producto}</p>
                      <img className="ml-16 rounded-lg" src={`${baseurl}/img/${item.imagen}`} alt={item.imagen} />
                       <p className="flex justify-center"><strong>Nombre Del Cliente:</strong>{item.nombre_cliente}</p>
                        <p className="flex justify-center"><strong>Fecha Venta: </strong>{formatDate(item.fecha_venta)}</p>                  
                        <p className="flex justify-center"><strong>Departamento: </strong>{item.departamento}</p>   
                        <p className="flex justify-center"><strong>Municipio: </strong>{item.municipio}</p>                                 
                        <p className="flex justify-center"><strong>Direccion : </strong>{item.direccion}</p>   
                        <p className="flex justify-center"><strong>Unidades Encargadas: </strong>{item.numero_de_unidades_compradas}</p> 
                        <p className="flex justify-center"><strong>Estado : </strong>{item.estado}</p> 
                        <p className="flex justify-center"><strong>Valor Total de Venta: </strong> ${item.valor_venta}</p>
                        {item.estado==="Por Entregar" &&(
                            <button 
                            onClick={()=>entregar(item.id)}
                            className="border-1 border-[#Ff6600] w-[53%] p-2 m-3 rounded-xl hover:bg-[#Ff6600] hover:text-white sm: relative left-[20%]  ">
                                Cambiar A Estado Entregado
                            </button>
                        )}                                 
                  </div>
                ))
               ):(
                    <p  className="flex justify-center text-2xl text-red-600">No Tenemos ventas en estado:  {estadoFiltro}</p>
               )}
            </div>
                <Contact/>
        </div>
    )
}