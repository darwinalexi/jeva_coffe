
import { faClose, faChevronRight, faChevronLeft, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { baseurl } from "../utils/data"
import { useState } from "react"
import { Carsmodal } from "./Carsmodal"
import { useCart } from "./Context/CartContext"
import { useEffect } from "react";


export const DetailsProduct = ({data, onclose}) => {
    if (data) {
        console.log("data", data);
    }
    const [index, setIndex]= useState(0)
    const [usertype, setuser]= useState()
     const { cartItems, setCartItems, increment, decrement } = useCart();

     const [openmodal, setmodal] = useState(null);


     const Cars_Product_close = async () => {
        setmodal(false);
    };


   useEffect(()=>{
        const user= JSON.parse(localStorage.getItem("usuario"));
        const client= JSON.parse(localStorage.getItem("Cliente"));

        if (user) {
             const usertipe= user.tipo;
            setuser(usertipe);
        }else if (!user && client) { 
            const clienttipe= client.tipo;
            setuser(clienttipe);
        }
 
   },[])    
   
   
   const decrementt= (product)=>{
        setCartItems((prev)=>
          prev
            .map((data)=>
             data.id===product.id
              ? { ...data, quantity: data.quantity - 1}
              : data
            )
            .filter((data)=>data.quantity>0)
        )
    }
    
    const imagenes= JSON.parse(data.imagen || "[]");
    
    const nextImage=()=>{
        setIndex((prev)=>(prev+1) % imagenes.length)
    }

    const previewImage=()=>{
        setIndex((prev)=>(prev-1 + imagenes.length) %imagenes.length )
    }
  return (
     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white  dark:bg-gray-800  rounded-lg p-6  sm:w-full md:w-[60%] relative sm: h-[78%] sm: overflow-scroll md:h-[80%] md:m-10  flex-1 ">
            <div className="col-span-2">
                <h1 className="flex justify-center text-2xl font-bold uppercase">Detalles del producto</h1>
            <FontAwesomeIcon icon={faClose} onClick={onclose} className="relative left-[90%] size-6 m-6"/>
            </div>
            <div className="grid sm: grid-cols-1 sm: md:grid-cols-2 h-[80%] w-[90%] ">
                <div className="w-full  flex items-center justify-center mb-6 h-[86%]">
                    <img src={`${baseurl}/img/${imagenes[index]}`} alt={`Imagen ${index + 1}`} className=" relative -top-[7%] w-full h-[86%] object-cover rounded-xl "/>
                      {imagenes.length > 1 && (
                            <>
                                <button onClick={previewImage} className="absolute left-2 bg-white dark:bg-gray-700 p-2 rounded-full shadow">
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                </button>
                                <button onClick={nextImage} className=" bg-white dark:bg-gray-700 p-2 rounded-full shadow">
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </button>
                            </>
                        )}

                </div>

                <div>
                    <p className="flex justify-center text-xl m-1"><strong>Nombre:</strong>{data.nombre}</p>
                     <p className="flex justify-center  text-xl m-1"><strong>Precio: </strong>{data.precio}.COP</p>
                     <p className="flex justify-center  text-xl m-1"><strong>Cantidad: </strong>{data.cantidad}</p>
                     <p className="flex justify-center  text-xl m-1"><strong>Unidades Diponibles: </strong>{data.unidades_disponibles|| "No Esta Disponible"}</p>
                     <p className="flex justify-center  text-xl m-1"><strong>Estado: </strong>{data.estado}</p>
                     <p className="flex justify-center  text-xl m-1"><strong>Tipo de Tueste: </strong>{data.tipo_tueste}</p>
                     <p className="flex justify-center  text-xl m-1"><strong>Aroma: </strong>{data.aroma}</p>
                     <p className="flex justify-center  text-xl m-1"><strong>Cuerpo: </strong>{data.cuerpo}</p>
                     <p className="flex justify-center  text-xl m-1"><strong>Sabor: </strong>{data.sabor}</p>

                {usertype !="Administrador" && data.unidades_disponibles > 0 && (
                            <div className="grid grid-cols-3 w-[66%] h-auto ml-1  mb-3   rounded-xl relative left-[20%]">
                                      <h1 className="col-span-3 flex justify-center  text-xl m-1 ">Añade al Carrito</h1>
                                        <button className="bg-[#003333]  rounded-xl dark:bg-[#5E2419] "   onClick={()=>increment(data)}>
                                            <FontAwesomeIcon icon={faPlus} className="text-white rounded-xl"                                   
                                            />
                                        </button>
                                        <p className="flex justify-center text-[#003333]  font-bold dark:text-white p-3">
                                            {cartItems.find(c=>c.id===data.id)?.quantity || 0}
                                        </p>
                                        <button  className="bg-[#003333] rounded-xl dark:bg-[#5E2419] "  
                                        onClick={()=>decrementt(data)}>
                                            <FontAwesomeIcon icon={faMinus}
                                            className="text-white"
                                            />
                                        </button>
                                 </div>
                                )}
                    

        
                </div>

            </div>
        </div>
        {openmodal && (
                <Carsmodal
                    onClose={Cars_Product_close}
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                />
            )}
    </div>
    
  )
}


