import { useLocation } from "react-router-dom"
import NavBar from "../Components/NavBar"

export const Buys_Client=()=>{
    
    const {state}= useLocation();
    const cliente= state?.cliente;
    return(
        <>
            <NavBar/>
            <h1 className="text-3xl font-bold text-center">Compras de {cliente?.nombre}</h1>
        </>
    )
}