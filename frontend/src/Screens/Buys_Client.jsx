import { useLocation } from "react-router-dom"
import NavBar from "../Components/NavBar"
import { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";
import { baseurl } from "../utils/data";
import SearchBar from "../Components/Searchar";
import { Contact } from "../Components/Contact";

export const Buys_Client=()=>{
    
    const {state}= useLocation();
    const cliente= state?.cliente;
    const id=cliente.identificacion;

    const [databuy, setbuy]= useState([]);
    const [searcher, setsearcher]= useState("");
    const [estadofiltrado, setfiltrado]=useState("todos");
    const see_buy=async()=>{
        const see= await axiosClient.get(`/listar_compras_clientes/${id}`)
        setbuy(see.data)
        console.log(see.data)
    }

    useEffect(()=>{
        see_buy();
    })
    
       const  formatDate=(fechaIso)=> {
  const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(fechaIso).toLocaleDateString('es-CO', opciones);
}
    const filterdata=()=>{
        return databuy.filter((listar)=>{
            const  estado= listar.estado.toLowerCase();
            const nombre_producto= listar.nombre_producto.toLowerCase();
            const search= searcher.toLowerCase();

            const buscar_produto=nombre_producto.includes(search);

            const filterstate= estadofiltrado.toLowerCase() === "todos" || estado ===estadofiltrado.toLowerCase();
            return filterstate && buscar_produto
        })
    }
    
    return(
        <>
            <NavBar/>
            <h1 className="text-3xl font-bold text-center">Compras de {cliente?.nombre}</h1>
            <SearchBar
                value={searcher}
                placeholder="Buscar Por Producto"
                onChange={(e)=>setsearcher(e.target.value)}
            />
            <select onChange={(e)=>setfiltrado(e.target.value)} value={estadofiltrado}>
                <option value="todos">Todos</option>
                <option value="Por Entregar">Por Entregar</option>
                <option value="Entregado">Entregado</option>
            </select>
           <div className="m-4 sm:grid grid-cols-1 md:grid grid-cols-3 gap-4 m-7">
             {filterdata().map(item=>(
                <div className="border-1 border-[#003333] rounded-xl flex justify-center grid grid-cols-1">
                     <p className="flex justify-center"><strong>Nombre del producto: </strong>{item.nombre_producto}</p>
                     <img src={`${baseurl}/img/${item.imagen}`} className="relative left-16 rounded-xl" />
                     <p className="flex justify-center"><strong>Departamento: </strong>{item.departamento}</p>
                     <p className="flex justify-center"><strong>Municipio: </strong>{item.municipio}</p>
                     <p className="flex justify-center"><strong>Direccion: </strong>{item.direccion}</p>
                     <p className="flex justify-center"><strong>Fecha Venta: </strong>{formatDate(item.fecha_venta)}</p>                  
                      <p className="flex justify-center"><strong>estado: </strong>{item.estado}</p>
                     <p className="flex justify-center"><strong>Cliente: </strong>{item.nombre_cliente}</p>
                     {item.estado=="Entregado" ?(
                        <p className="flex justify-center"><strong>Unidades Compradas: </strong>{item.numero_de_unidades_compradas}</p>
                     ):(
                        <p className="flex justify-center"><strong>Unidades Encargadas: </strong>{item.numero_de_unidades_compradas}</p>
                     )}
                     <p className="flex justify-center"><strong>Valor Venta: </strong>{item.valor_venta}</p>
                 
                </div>
            ))}
           </div>
        <Contact/>
        </>
    )
}