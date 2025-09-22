import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axiosClient from "../utils/axiosClient";
import NavBar from "../Components/NavBar";
import { baseurl } from "../utils/data";
import { Contact } from "../Components/Contact";
import Swal from "sweetalert2";


export const DetailSales = () => {
    const [data, setdata]= useState([]);
    const {id}= useParams();

    const detailsales= async()=>{
        const see= await axiosClient.get(`/detalles_ventas/${id}`)
        setdata(see.data);
    }
    useEffect(()=>{
        console.log("faya", data),
        detailsales();
    },[])

    const entregar=async(id)=>{
        try {
            const see= await axiosClient.put(`/entregar/${id}`);
            if (see.status===200) {
                Swal.fire({
                    text:see.data.mensaje,
                    imageUrl: "../../public/img/gif.gif",
                     imageWidth: 120,
                    imageHeight: 120,
                imageAlt: 'Animación entrega'
                }).then((result)=>{
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                })
            
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div >
      <NavBar/>
      <div className="mt-20  grid sm: grid-cols-1 md:grid-cols-2 ">
        {data.map(item=>{
            let imagenes=[]
                        try {
                            if (item.imagen && item.imagen.trim().startsWith('[')) {
                                imagenes = JSON.parse(item.imagen);
                            } else if (item.imagen) {
                                imagenes = [item.imagen];      
                            }
                        } catch (error) {
                            console.log("error",error)
                            imagenes=[];
                        }
                    return(
                            <>
                            <p className="md:col-span-2 flex justify-center text-2xl font-bold uppercase">Detalles de la Compra</p>
                            <div >
                                <img src={`${baseurl}/img/${imagenes[0]}`} alt={imagenes[0]}className="p-6" />
                            </div>
                            <div>
                                <p className="flex justify-center text-xl p-1"><strong>Nombre Producto:    </strong>{item.nombre_producto}</p>
                                <p className="flex justify-center text-xl p-1"><strong>Nombre  Del Cliente:    </strong>{item.nombre_cliente}</p>
                            {item.apellidos.length>0 &&(
                                <p className="flex justify-center text-xl p-1"><strong>Apellidos Del Cliente:    </strong>{item.apellidos}</p>
                            )}
                            <p className="flex justify-center text-xl p-1"><strong>Celular del Cliente:    </strong>{item.celular}</p>
                            <p className="flex justify-center text-xl p-1"><strong>Correo del Cliente:    </strong>{item.correo}</p>
                             <p className="flex justify-center text-xl p-1"><strong>Pais de Venta:    </strong>{item.nombre_pais}</p>
                            <p className="flex justify-center text-xl p-1"><strong>Departamento o Región: </strong>{item.departamento}</p>
                            <p className="flex justify-center text-xl p-1"><strong>Municipio o Ciudad:    </strong>{item.municipio}</p>
                            <p className="flex justify-center text-xl p-1"><strong>Direccion:    </strong>{item.direccion}</p>
                            <p className="flex justify-center text-xl p-1"><strong>Estado de Compra:    </strong>{item.estado}</p>                           
                            {item.estado  === 'Entregado' ?(
                                <p className="flex justify-center text-xl p-1"><strong>Unidades:Compradas: </strong>{item.numero_de_unidades_compradas}</p>                            
                            ):(
                                <p className="flex justify-center text-xl p-1"><strong>Unidades Encargadas:  </strong>{item.numero_de_unidades_compradas}</p>                            
                            )}
                            <p className="flex justify-center text-xl p-1"><strong>Valor De Venta:    </strong>{item.valor_venta}</p>                            
                            {item.estado==="Por Entregar" &&(
                                <button
                            onClick={()=>entregar(item.id)}
                            className="relative sm: left-32 md:left-52 m-4 border-1 rounded-xl border-[#Ff6600] hover:bg-[#Ff6600]">
                                <p className="uppercase p-4">Dar Por estado Entregado</p>
                            </button>
                            )}
                            </div>
                            </>
                    )
        })}
         

      </div>
      <Contact/>
    </div>
  )
}


