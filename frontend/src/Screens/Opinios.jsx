import NavBar from "../Components/NavBar"
import { useParams } from "react-router-dom"
import axiosClient from "../utils/axiosClient";
import { useEffect, useState } from "react";
export const Opinions=()=>{
    const { id } = useParams();
    const [data, setdata]= useState()


    const see_product= async()=>{
        const see = await axiosClient.get(`/producto/${id}`)
        setdata(see.data); 
    }

    useEffect(()=>{
        see_product();
    },[])

    return(
        <>
         <NavBar/>
       {data .map((item)=>(
 <p>{item.nombre}</p>
       )))}
        </>
       
    
}