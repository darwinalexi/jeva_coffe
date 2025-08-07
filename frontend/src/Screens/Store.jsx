import Imagen from "../Components/Image";
import NavBar from "../Components/NavBar";
import Cafeimg from "../../src/assets/img/cafe1.png";
import axiosClient from "../utils/axiosClient";
import { useState, useEffect } from "react";
import { baseurl } from "../utils/data";
import { Carsmodal } from "../Components/Carsmodal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTrash, faEdit, faWarning, faPlus, faMinus}  from '@fortawesome/free-solid-svg-icons';
import Swl from "sweetalert2";
import SearchBar from "../Components/Searchar"
import Swal from "sweetalert2";
import { Update_Product } from "../Components/Update_Product";
import { Contact } from "../Components/Contact";
import { Create_Product } from "../Components/CreateProduct";
import { Link } from "react-router-dom";

export const Store = () => {
    const [date, setdata] = useState([]);
    const [openmodal, setmodal] = useState(null);
    const [carsitems, setcars] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAuth, setAuth]= useState(false)
    const [typeuse, settype] = useState("");
    const [openupdate, setupdate]=useState(false);
    const [dataupdate, setdataupdate]=useState([]);
    const [filter, setfilter]= useState("Todos");
    const[modalcreate, setcreate]= useState(false);

       useEffect(() => {
    const datalocal = JSON.parse(localStorage.getItem('usuario'));
    const dataclient=JSON.parse(localStorage.getItem('Cliente'));
    

        const products = async () => {
                try {
                    const show = await axiosClient.get("/productos_disponibles");
                    setdata(show.data)
                    if(datalocal.tipo==="Administrador"){
                    const allproduct = await axiosClient.get("/todos_productos");
                    setdata(allproduct.data);                
                    }else if(dataclient.tipo==="Clientes"){
                        const clientProducts = await axiosClient.get(`/productos_cliente/${dataclient.id}`);
                        setdata(clientProducts.data);
                    }
                } catch(e){
                    console.log("error", e);
                }
            };

    if (datalocal && datalocal.tipo) {
        settype(datalocal.tipo);        
        setAuth(true);
    } else  if (dataclient && dataclient.tipo) {
        settype(dataclient.tipo);
        setAuth(true);
    }else{
        settype("");
        setAuth(false);
    }

    products();
}, []);
 


 
   
    const Product_delete=async(id)=>{
        try{
            const dele= await axiosClient.delete( `/productos/${id}`);
            if (dele.status===200) {
                Swal.fire({
                    icon:'success',
                    text:dele.data.mensaje
                })
                window.location.reload();
            } else {
                 Swal.fire({
                    icon:'error',
                    text:"Algo paso"
                })
            }
        }catch(e){
            console.log("error", e)
        }
    }

    const Cars_Product = async () => {
        setmodal(true);
    };

    const openupdate_Product=(data)=>{
        setdataupdate(data);
        setupdate(true);
    }

     const  closeupdate=()=>{
        setdataupdate(null);
        setupdate(false);
    }

    const addToCart = (product) => {
        console.log("Contenido actual del carrito:", carsitems);

        setcars((prev) => {
            const exist = prev.find((item) => item.id === product.id);
            if (exist) {
                if (exist.quantity >= product.unidades_disponibles) {
                    Swl.fire({
                        title: 'Advertencia',
                        icon: 'warning',
                        text: `No hay suficientes unidades disponibles. Solo hay ${product.unidades_disponibles} en stock.`
                    });
                    return prev;
                }
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                Swl.fire({
                    title: 'Éxito',
                    icon: 'success',
                    text: `${product.nombre} ha sido añadido al carrito!`
                });
                return [...prev, { ...product, quantity: 1 }];
            }
        });
    };

    const Cars_Product_close = async () => {
        setmodal(false);
    };

const createproductmodal=()=>{
    setcreate(true);
}

const closecreate=()=>{
    setcreate(false);
} 

const increment = (product) => {
    setcars((prev) => {
        const exist = prev.find((item) => item.id === product.id);
        if (exist) {
            if (exist.quantity < product.unidades_disponibles) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Stock limitado',
                    text: `Solo hay ${product.unidades_disponibles} unidades disponibles.`
                });
                return prev;
            }
        } else {
            return [...prev, { ...product, quantity: 1 }];
        }
    });
};


const decrementt= (product)=>{
    setcars((prev)=>
      prev
        .map((item)=>
         item.id===product.id
          ? { ...item, quantity: item.quantity - 1}
          : item
        )
        .filter((item)=>item.quantity>0)
    )
}

    return (
        <div>
            <NavBar />
                <div className="relative top-0 w-full h-[35vh] sm:h-full md:h-full lg:h-full xl:h-full overflow-hidden">
                <img
                    alt="Img"
                    src={Cafeimg}
                    className="w-full h-full sm:object-none md:object-cover "
                />
                </div>

            <div>
                {!isAuth  ?(
                <h1 className="font-bold flex justify-center text-3xl text-orange-500">Productos Disponibles</h1>                    
                ):(
                <h1 className="font-bold flex justify-center text-3xl text-orange-500">Productos De Nuestra Plataforma</h1>
                )}
                
        
                <div className="flex justify-center mb-4  mt-4 grid grid-cols-1">
                    <SearchBar 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                        placeholder="Buscar productos de Jeva Coffe..."
                    />
                    {isAuth && typeuse==="Administrador" && (
                        <>
                      <div className="flex flex-col items-center sm:flex-row sm:justify-center gap-3 mt-4">
                        <div className="grid grid-cols-2 gap-20  w-full">
                       <div className="ml-8" >
                        <label className="text-[#003333] font-semibold dark:text-white">Filtrar por estado:</label>
                        <br />
                        <select
                            className="appearance-none w-[250px] px-4 py-2 bg-[#003333] text-white font-semibold rounded-lg shadow-md hover:bg-[#004d4d] focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200"
                            value={filter}
                            onChange={(e) => setfilter(e.target.value)}
                        >
                            <option value="Todos">Todos</option>
                            <option value="Disponible">Disponibles</option>
                            <option value="No Disponible">No Disponibles</option>
                        </select>
                       </div>
                       
                        <div 
                        onClick={createproductmodal}
                        className="p-4 border-2 border-orange-500 rounded-xl hover:bg-orange-500 hover:text-white w-[50%] relative left-[47%] hover:cursor-pointer">
                            Crear Producto
                        </div>

                      </div>
                        </div>
                        </>

                    )}

                </div>
                <button
                    className="flex items-center gap-2 bg-[#003333] text-white px-4 py-2 rounded-xl shadow-md hover:bg-[#004d4d] transition"
                    onClick={Cars_Product}
                >
                    <FontAwesomeIcon icon={faShoppingCart} />
                    <span>Carrito de Compras</span>
                </button>
                {!isAuth &&(
               <div className="flex justify-end px-6 mt-4 gap-32">
                <div className="flex inline-block border-1 border-red-500 items-center p-3 rounded-xl">
                    <p className="p-1  text-red-500" style={{fontSize:"12px"}}>Debes tener la Mayoria de edad para poder Comprar en nuestra tienda JEVA COFFE</p>
                        <FontAwesomeIcon icon={faWarning} className="text-orange-400  size-5"/>
                    </div>

                   
              
                </div>


                )}
              

                <div className="sm:grid grid-cols-1 p-7 gap-4 md:grid grid-cols-3 p-3">
                
                 {date.filter(item => 
                        item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) && 
                        (filter === "Todos" || item.estado === filter) // Filtra por estado
                    ).map((item) => (
                    <div key={item.id} className="border-2 border-[#003333] shadow-lg mb-12 hover:shadow-green-900 rounded-xl w-[80%]">
                        <h1 className="flex justify-center font-bold">{item.nombre}</h1>
                        <img src={`${baseurl}/img/${item.imagen}`} className="rounded-xl ml-10 w-[74%]" />
                        
                        <p className="flex justify-center">Precio: ${item.precio}</p>
                        <p className="flex justify-center">Unidades Disponibles: {item.unidades_disponibles}</p>
                        <p className="flex justify-center">Descripcion: {item.descripcion || "N/A"}</p>
                        <p className="flex justify-center">Estado: {item.estado}</p>
                           <Link 
                                           to={`/opiniones/${item.id}`}
                                           className="text-blue-500 flex justify-center underline mb-2"
                                        >Comentarios</Link>                               
                            {isAuth && typeuse==="Administrador" && (
                                <div className="flex justify-center">
                                    <FontAwesomeIcon icon={faTrash} className="p-8 size-10 text-red-600 cursor-pointer" onClick={()=>Product_delete(item.id)}/>
                                    <FontAwesomeIcon icon={faEdit}  className="p-8 size-10 text-orange-500 cursor-pointer"  onClick={()=>openupdate_Product(item)}/> 
                                </div>
                            )}
                            
                            {isAuth && typeuse==="Clientes" &&(
                                
                                <div className="grid grid-cols-1">
                                    
                                <div className="grid grid-cols-3 w-[96%] h-auto ml-1 mr-4 mb-3 border-1 border-[#003333] rounded-xl">
                                      
                                        <button className="bg-[#003333]  rounded-xl"   onClick={()=>increment(item)}>
                                            <FontAwesomeIcon icon={faPlus} className="text-white rounded-xl"                                   
                                            />
                                        </button>
                                        <p className="flex justify-center text-[#003333] font-bold dark:text-white p-3">
                                            {carsitems.find(c=>c.id===item.id)?.quantity || 0}
                                        </p>
                                        <button  className="bg-[#003333] rounded-xl"  
                                        onClick={()=>decrementt(item)}>
                                            <FontAwesomeIcon icon={faMinus}
                                            className="text-white"
                                            />
                                        </button>
                                 </div>
                              
                        
                                
                                </div>
                               
                            )}
                        
                    </div>
                ))}
                
                {date.filter(item => 
                    item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
                ).length === 0 && (
                    <p className="flex justify-center text-red-500 mt-4">No se encontraron productos que coincidan con "{searchTerm}".</p>
                )}
            </div>
            </div>
            {openmodal && (
                <Carsmodal
                    onClose={Cars_Product_close}
                    cartItems={carsitems}
                    setCartItems={setcars}
                />
            )}
            {openupdate && (<Update_Product onclose={closeupdate} data={dataupdate} />) }
            {modalcreate && (<Create_Product onclose={closecreate} />)}
            <Contact/>
        </div>
    );
};
