import { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import axiosClient from "../utils/axiosClient";
import Imagen from "../Components/Image";
import { Edit_user } from "../Components/Edit_User";
import federacion from "../assets/img/federacion.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";

export const Profile = () => {
    const [usuario, setuser] = useState([]);
    const [updateuser, setmodal]= useState(false);
    const  [datauser, setuserdata]=useState([]);

    const [price, setprice]= useState([]);
    const [date, setdate]= useState([]);
    const openmodal=(usuario)=>{
        setuserdata(usuario);
        setmodal(true);
    }

     const closemodal=()=>{
        setuserdata(null);
        setmodal(false);
    }
    useEffect(() => {
        const datalocal = JSON.parse(localStorage.getItem('usuario')||'{}');
        const identificacion= datalocal.identificacion;

        price_coffe();
        
        (async () => {
            try {
                const response = await axiosClient.get(`/usuario/${identificacion}`);
                setuser(response.data);
            } catch (err) {
                console.log(err)
            }
        })(); 
    }, []);

    
    const price_coffe=async()=>{
        try{
            const price= await axiosClient.get("/precionacional")
            
            setprice(price.data.precio_cop_por_carga)
            setdate(price.data.fecha)
        }catch(e){
            console.log(e)
        }
    }
    return (
        <>
            <NavBar />
            
                <div className="">
                    {usuario .map((data=>(
                        <>
                        <div className="w-[95%] h-[100%]  m-2 sm:grid grid-cols-1    md:grid grid-cols-2 mb-20 ">
                        <h1 className="text-2xl font-bold m-3 col-span-2 flex justify-center"   >Perfil de Usuario</h1>
                            <div className="sm:w-full  md:w-[90%] h-[95%]  grid grid-cols-1 gap-4 relative left-[2%] top-7  rounded-xl sm: border-b-2 border-b-[#003333]    md:border-2 border-[#003333] p-5">
                            
                               <div className="h-auto">
                                  <Imagen
                                     name={data.imagen}
                                     className="object-cover w-full  h-screen  "
                                  />
                                </div>
                                <div className="mt-6 space-y-2 text-lg text-gray-700">
                                    <p><strong>Identificación:</strong> {data.identificacion}</p>
                                    <p><strong>Nombre:</strong> {data.nombre}</p>
                                    <p><strong>Correo:</strong> {data.correo}</p>
                                    <p><strong>Descripción:</strong> {data.descripcion}</p>
                                    <p><strong>Tipo de Usuario:</strong> {data.tipo}</p>
                                    <p><strong>Edad:</strong> {data.edad} años</p>
                                    <button
                                    className="md: relative left-[42%] bottom-7    bg-[#FF6600] hover:bg-orange-600 transition-colors text-white px-6 py-3 rounded-lg mt-4"
                                    onClick={() => openmodal(data)}
                                    >
                                    Editar información
                                    </button>

                                </div>

                            </div>
                            
                            <div className="bg-[#f5f5f5] rounded-xl p-6 shadow-lg mt-8">
                        <img src={federacion} className="w-full max-w-md mx-auto" alt="Federación" />
                        <p className="text-center text-xl font-semibold mt-4">
                            Precio del Café Pergamino seco por carga de 125 kg: <br />
                            <span className="text-green-700 text-3xl font-bold">
                            ${Number(price).toLocaleString("es-CO")}
                            </span>
                            <br />
                            <span className="text-sm text-gray-500">Fecha: {date}</span>
                        </p>

                        <div className="mt-4 bg-white border-l-4 border-orange-400 p-4 rounded-lg shadow">
                            <FontAwesomeIcon icon={faWarning} className="text-orange-500 mr-2" />
                            <span className="text-red-600 font-bold">IMPORTANTE:</span> Este precio se basa en la pagina oficial de la Federación Nacional de Cafeteros de Colombia.
                        </div>
                        </div>

                        
                        </div>
                      
                    </>
                    )))}
                   

                {updateuser && (<Edit_user onclose={closemodal} data={datauser}/>)}                
                </div>
        </>
    );
};
