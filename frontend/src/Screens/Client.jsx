import NavBar from "../Components/NavBar"
import SearchBar from "../Components/Searchar";
import axiosClient from "../utils/axiosClient";
import { useEffect, useState } from "react"; 
import DataTable from 'react-data-table-component';
import { Contact } from "../Components/Contact";
import {Link} from "react-router-dom"

export const Client=()=>{
    
    const [data, setdata]= useState([]);
    const [client, Setclient]= useState("");
  

    const clients=async()=>{
        const show= await axiosClient.get("/ver_cliente")
        setdata(show.data);        
    }

    useEffect(()=>{
        clients();
    },[])

    

    const column=[
        {
            name:'Identiicacion',
            selector:row=>row.identificacion
        },

        {
            name:'Nombre',
            selector:row=>row.nombre
        },

        {
            name:'Edad',
            selector:row=>row.edad
        },

        
        {
            name:'correo',
            selector:row=>row.correo
        },
        
        {
            name:'Celular',
            selector:row=>row.celular
        },
        {
            name:'Accion',
            cell:row=>(
                <div>
                    <Link state={{ cliente: row }}  to="/compras_cliente" className="border-2 border-orange-500 rounded-lg p-2 hover:bg-orange-500 hover:text-white">
                        Ver Compras de {row.nombre}
                    </Link>
                </div>
            )
        }

    ]
    const filterclient= data.filter(item=>item.nombre.toLowerCase().includes(client.toLocaleLowerCase()))
    return(
        <>
        <NavBar/>
        <h1 className="flex justify-center m-8 text-4xl font-black text-[#3c2a21]">Clientes</h1>
        <SearchBar
        value={client}
        onChange={(e)=>Setclient(e.target.value)}
        placeholder="Buscar Clientes por nombre"
        />
        {filterclient.length>0?(
            <DataTable
            columns={column}
            data={filterclient}
            pagination
            />
        ):(
            <p className="text-4xl flex justify-center text-red-400 m-6">No Hay Clientes Registrados con el nombre {client}</p>
        )}

        <Contact/>
    </>
    )
}