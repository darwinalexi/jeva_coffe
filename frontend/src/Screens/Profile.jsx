import { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import axiosClient from "../utils/axiosClient";
import Imagen from "../Components/Image";

export const Profile = () => {
    const [usuario, setuser] = useState([]);

    useEffect(() => {
        const identificacion = localStorage.getItem('identificacion');


        (async () => {
            try {
                const response = await axiosClient.get(`/usuario/${identificacion}`);
                setuser(response.data);
            } catch (err) {
                console.log(err)
            }
        })(); 
    }, []);

    return (
        <>
            <NavBar />
            
        
                <div className="">
                    {usuario .map((data=>(
                        <>
                        <div className="w-[60%]  sm:grid grid-cols-1   md:grid grid-cols-2 gap-24 relative left-[15%] top-24">
                            <div className="">
                               <h1 className="text-6xl font-bold m-3"   >Perfil de Usuario</h1>
                                <p className="font-libre text-2xl m-3" >No°  de Identificacion  : {data.identificacion}</p>
                                <p  className="font-libre text-2xl m-3"  >Nombre Completo  : {data.nombre}</p>
                                <p  className="font-libre text-2xl m-3 "  >Correo Electronico: {data.correo}</p>  
                                <p  className="font-libre text-2xl m-3"  >Descripcion: {data.descripcion} </p>
                                <p className="font-libre text-2xl m-3" >Tipo de usuario:{data.tipo}</p>
                                <p className="font-libre text-2xl m-3" >Edad: {data.edad} Años </p>
                            </div>
                          
                           <div className="h-screen">
                            <Imagen
                                name={data.imagen}
                                className="object-cover w-full  h-screen  "
                            />
                            </div>
                        </div>
                    </>
                    )))}
                   
                
                </div>
        </>
    );
};
