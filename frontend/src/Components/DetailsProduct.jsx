import { faClose, faChevronRight,faShoppingCart, faChevronLeft, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { baseurl } from "../utils/data"
import { useState } from "react"
import { Carsmodal } from "./Carsmodal"
import { useCart } from "./Context/CartContext"


export const DetailsProduct = ({data, onclose}) => {
    if (data) {
        console.log("data", data);
    }
    const [index, setIndex]= useState(0)
     const { cartItems, setCartItems, increment, decrement } = useCart();

     const [openmodal, setmodal] = useState(null);


     const Cars_Product_close = async () => {
        setmodal(false);
    };


     const Cars_Product = async () => {
        setmodal(true);
    };
   
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
        <div className="bg-white  dark:bg-gray-800  rounded-lg p-6  sm:w-full md:w-[60%] relative md:h-[80%] md:m-10  flex-1 ">
            <div className="col-span-2">
                <h1 className="flex justify-center text-xl">Detalles del producto</h1>
            <FontAwesomeIcon icon={faClose} onClick={onclose} className="relative left-[90%] size-6"/>
            </div>
            <div className="grid grid-cols-2 h-[80%] w-[90%] ">
                <div className="relative w-full  flex items-center justify-center mb-6 h-full">
                    <img src={`${baseurl}/img/${imagenes[index]}`} alt={`Imagen ${index + 1}`} className="w-full h-full object-cover rounded"/>
                      {imagenes.length > 1 && (
                            <>
                                <button onClick={previewImage} className="absolute left-2 bg-white dark:bg-gray-700 p-2 rounded-full shadow">
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                </button>
                                <button onClick={nextImage} className="absolute right-2 bg-white dark:bg-gray-700 p-2 rounded-full shadow">
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </button>
                            </>
                        )}

                </div>

                <div>
                    <p className="flex justify-center"><strong>Nombre:</strong>{data.nombre}</p>
                     <p className="flex justify-center"><strong>Descripcion: </strong>{data.descripcion}</p>
                     <p className="flex justify-center"><strong>Precio: </strong>{data.precio}.COP</p>
                     <p className="flex justify-center"><strong>Cantidad: </strong>{data.cantidad}</p>
                     <p className="flex justify-center"><strong>Unidades Diponibles: </strong>{data.unidades_disponibles|| "No Esta Disponible"} Unid.</p>
                     <p className="flex justify-center"><strong>Estado: </strong>{data.estado}</p>

                     <button
                        className="flex items-center gap-2 bg-[#003333] text-white px-4 py-2 rounded-xl shadow-md hover:bg-[#004d4d] transition relative left-[52%] m-9 dark:bg-[#1BB3A1]"
                        onClick={Cars_Product}
                        >
                                         <FontAwesomeIcon icon={faShoppingCart} />
                                         <span>Ver Carro De Compras</span>
                                     </button>

                                  <div className="grid grid-cols-3 w-[66%] h-auto ml-1 mr-4 mb-3   rounded-xl relative left-[23%]">
                                      <h1 className="col-span-3 flex justify-center">Añade al Carrito</h1>
                                        <button className="bg-[#003333]  rounded-xl dark:bg-[#1BB3A1]"   onClick={()=>increment(data)}>
                                            <FontAwesomeIcon icon={faPlus} className="text-white rounded-xl"                                   
                                            />
                                        </button>
                                        <p className="flex justify-center text-[#003333]  font-bold dark:text-white p-3">
                                            {cartItems.find(c=>c.id===data.id)?.quantity || 0}
                                        </p>
                                        <button  className="bg-[#003333] rounded-xl dark:bg-[#1BB3A1]"  
                                        onClick={()=>decrementt(data)}>
                                            <FontAwesomeIcon icon={faMinus}
                                            className="text-white"
                                            />
                                        </button>
                                 </div>
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


