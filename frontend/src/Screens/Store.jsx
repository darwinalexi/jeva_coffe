import Imagen from "../Components/Image";
import NavBar from "../Components/NavBar";
import Cafeimg from "../../src/assets/img/cafe1.png";
import axiosClient from "../utils/axiosClient";
import { useState, useEffect } from "react";
import { baseurl } from "../utils/data";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash, faEdit, faWarning, faPlus, faMinus}  from '@fortawesome/free-solid-svg-icons';
import SearchBar from "../Components/Searchar"
import { Update_Product } from "../Components/Update_Product";
import { Contact } from "../Components/Contact";
import { Create_Product } from "../Components/CreateProduct";
import { Link } from "react-router-dom";
import { DetailsProduct } from "../Components/DetailsProduct";
import { Carsmodal } from "../Components/Carsmodal";

export const Store = () => {
    const [date, setdata] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAuth, setAuth]= useState(false)
    const [typeuse, settype] = useState("");
    const [openupdate, setupdate]=useState(false);
    const [dataupdate, setdataupdate]=useState([]);
    const [filter, setfilter]= useState("Todos");
    const[modalcreate, setcreate]= useState(false);
    const [opendetal, setdetailes]= useState(false);
    const [datadetails, setdatadetail] =useState([]);
    const [carsbuy, setcars]=useState(false);   
    
    const opencar=()=>{
        setcars(true);
    }
     const closecar=()=>{
        setcars(false);
    }

    const opendeta=(date)=>{
        setdatadetail(date)
        setdetailes(true);
        setupdate(false);
        
    }
    const closedeta=()=>{
        setdatadetail(false);
        setdetailes(null);
    }
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

    

    const openupdate_Product=(data)=>{
        setdataupdate(data);
        setupdate(true);
        setdetailes(false);
    }

     const  closeupdate=()=>{
        setdataupdate(null);
        setupdate(false);
    }


     
    

    

const createproductmodal=()=>{
    setcreate(true);
}

const closecreate=()=>{
    setcreate(false);
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
                <h1 className="font-bold flex justify-center text-3xl text-[#Ff6600]">Productos Disponibles</h1>                    
                ):(
                <h1 className="font-bold flex justify-center text-3xl text-[#Ff6600]">Productos De Nuestra Plataforma</h1>
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
                        className="p-4 border-2 border-[#Ff6600] rounded-xl hover:bg-[#Ff6600] hover:text-white w-[50%] relative left-[47%] hover:cursor-pointer">
                            Crear Producto
                        </div>

                      </div>
                        </div>
                        </>

                    )}
                    
                            {!isAuth &&(

                                <div className="">
                                    <button  onClick={opencar}  className="bg-[#003333] p-3 dark:bg-[#1BB3A1] rounded-xl text-white m-3">
                                        Carrito de Compras
                                    </button>
                        
                                
                                </div>
                               
                            )}

                </div> 

                <div className="sm:grid grid-cols-1 p-7 gap-4 md:grid grid-cols-3 p-3">
                
                 {date.filter(item => 
                        item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) && 
                        (filter === "Todos" || item.estado === filter) // Filtra por estado
                    ).map((item) => {
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
                        <div 
                        onClick={()=>opendeta(item)}
                        key={item.id} 
                        className="hover:cursor-pointer border-2 border-[#003333] shadow-lg mb-12 hover:shadow-green-900 rounded-xl w-[80%]">
                        <h1 className="flex justify-center font-bold">{item.nombre}</h1>
                        <div className="p-5 rounded-xl">
                            <img src={`${baseurl}/img/${imagenes[0]}`} alt="" />
                        </div>
                        
                        <p className="flex justify-center">Precio: ${item.precio}</p>
                        <p className="flex justify-center">Unidades Disponibles: {item.unidades_disponibles}</p>
                        <p className="flex justify-center">Descripcion: {item.descripcion || "N/A"}</p>
                        <p className="flex justify-center">Estado: {item.estado}</p>
                           <Link 
                                           to={`/opiniones/${item.id}`}
                                           className="text-blue-500 flex justify-center underline mb-2"
                                        >Comentarios</Link>                               
                            {isAuth && typeuse === "Administrador" && (
                                <div className="flex justify-center z-50">
                                    <div>
                                        <FontAwesomeIcon 
                                            icon={faTrash} 
                                            className="p-8 size-10 text-red-600 cursor-pointer" 
                                            onClick={e => { e.stopPropagation(); Product_delete(item.id); }}
                                        />
                                    </div>
                                    <div>
                                        <FontAwesomeIcon 
                                            icon={faEdit}  
                                            className="p-8 size-10 text-[#Ff6600] cursor-pointer"  
                                            onClick={e => { e.stopPropagation(); openupdate_Product(item); }}
                                        /> 
                                    </div>
                                </div>
                            )}

                        
                    </div>    )
                    })}
                
                {date.filter(item => 
                    item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
                ).length === 0 && (
                    <p className="flex justify-center text-red-500 mt-4">No se encontraron productos que coincidan con "{searchTerm}".</p>
                )}
            </div>
            </div>
            
            {openupdate && (<Update_Product onclose={closeupdate} data={dataupdate} />) }
            {modalcreate && (<Create_Product onclose={closecreate} />)}
            {opendetal &&(<DetailsProduct data={datadetails} onclose={closedeta}/>)}
            {carsbuy && (<Carsmodal onClose={closecar} />)}
            <Contact/>
        </div>
    );
};
