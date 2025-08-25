import { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import axiosClient from "../utils/axiosClient";
import Imagen from "../Components/Image";
import { Edit_user } from "../Components/Edit_User";
import federacion from "../assets/img/federacion.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { baseurl } from "../utils/data";
import SearchBar from "../Components/Searchar";
import { Contact } from "../Components/Contact";

export const Profile = () => {
    const [usuario, setuser] = useState([]);
    const [updateuser, setmodal]= useState(false);
    const  [datauser, setuserdata]=useState([]);
    const [price, setprice]= useState([]);
    const [date, setdate]= useState([]);
    const [buys, setbuys]= useState([]);
    const [searcher, setsearcher]= useState("");    
    const [estadoFiltro, setEstadoFiltro] = useState("todos");
    const [numbersales, setsales]= useState([]);
    const [isDark, setisDark] = useState(() => {
  return Boolean(JSON.parse(localStorage.getItem("darkMode") || "false"));
});



    const count_sales_client=async()=>{
        try {
            const user= JSON.parse(localStorage.getItem('Cliente') || '{}');
            const id_cliente = user.identificacion
            const see= await axiosClient.get(`/contar_ventas_cliente/${id_cliente}`);
            setsales(see.data);
            console.log("Mis Ventas",see.data);
        } catch (error) {
            console.log(error);
        }
    }

    const openmodal=(usuario)=>{
        setuserdata(usuario);
        setmodal(true);
    }

     const closemodal=()=>{
        setuserdata(null);
        setmodal(false);
    }

    const client= async(i)=>{
        try {
            const identificacion=  JSON.parse(localStorage.getItem('Cliente'));
            const ide= identificacion.identificacion;
            const response = await axiosClient.get(`/ver_cliente/${ide}`);
            if (identificacion && ide) {
              buys_client();
              count_sales_client();
            }
            setuser(response.data);
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        client();
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

    useEffect(() => {
  if (isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  localStorage.setItem("darkMode", JSON.stringify(isDark));
}, [isDark]);




    const buys_client=async()=>{
        try {
            const user= JSON.parse(localStorage.getItem('Cliente') || '{}');
            const id_cliente = user.identificacion
            const see= await axiosClient.get(`/listar_compras_cliente/${id_cliente}`);
            setbuys(see.data);
             console.log("Mis Compras",see.data);
        } catch (error) {
            console.log(error);
        }
    }

    
     const  formatDate=(fechaIso)=> {
        const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(fechaIso).toLocaleDateString('es-CO', opciones);
      }
    const price_coffe=async()=>{
        try{
            const price= await axiosClient.get("/precionacional")
            
            setprice(price.data.precio_cop_por_carga)
            setdate(price.data.fecha)
        }catch(e){
            console.log(e)
        }
    }

    const  filterdata=()=>{
        return buys.filter((buys)=>{
            const estado=buys.estado.toLowerCase();
            const nombre_producto=  buys.nombre_producto.toLowerCase();
            const buscar= searcher.toLowerCase();

            const buscarproducto=nombre_producto.includes(buscar);
            const estadofilter= estadoFiltro==="todos" || estado=== estadoFiltro.toLowerCase();
            
            return buscarproducto && estadofilter;

        })
    }


    return (
      <>
        <NavBar />
        <div className=" min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
          <main className="col-span-2 mt-9">

            {usuario.map((data) => (
              <>
              <div key={data.identificacion} className="sm:grid grid-cols-1 gap-y-8  md:grid grid-cols-2 mb-8 pt-12">
                <div className="h-auto">
                  <h1 className="text-2xl font-bold text-center mb-6">Perfil de Usuario</h1>
                  {data.imagen && data.imagen.length > 0 ? (
                    <Imagen
                      name={data.imagen}
                      className="w-64 h-64 object-cover rounded-lg shadow-md"
                    />
                  ) : (
                    <p>No Hay Imagen De Perfil</p>
                  )}
                  <div className="space-y-2 relative bottom-[52%] left-16 text-lg ">
                    <p><strong>Identificación:</strong> {data.identificacion}</p>
                    <p><strong>Nombre:</strong> {data.nombre}</p>
                    <p><strong>Correo:</strong> {data.correo}</p>
                    <p><strong>Tipo de Usuario:</strong> {data.tipo}</p>
                    {data.tipo === "Administrador" && (
                      <>
                        <p><strong>Descripción:</strong> {data.descripcion}</p>
                        <p><strong>Edad:</strong> {data.edad} años</p>
                      </>
                    )}
                    <button
                      className="bg-[#FF6600] hover:bg-[#FF6600] transition-colors text-white px-6 py-3 rounded-lg mt-4 "
                      onClick={() => openmodal(data)}
                    >
                      Editar información
                    </button>
                  </div>
                </div>
                <div>
                  {data.tipo === "Administrador" && (
                    <>
                     <div className="bg-gray-300 dark:bg-black rounded-xl p-6 shadow-lg mb-12 w-full">
                      <img src={federacion} className="w-full max-w-md mx-auto" alt="Federación" />
                      <p className="text-center text-xl font-semibold mt-4">
                        Precio del Café Pergamino seco por carga de 125 kg: <br />
                        <span className="text-green-700 dark:text-white text-3xl font-bold">
                          ${Number(price).toLocaleString("es-CO")}
                        </span>
                        <br />
                        <span className="text-sm text-gray-500">Fecha: {date}</span>
                      </p>
                      <div className="mt-4 bg-white border-l-4 border-[#Ff6600] p-4 rounded-lg shadow dark:bg-black dark:border-1 border-white">
                        <FontAwesomeIcon icon={faWarning} className="text-[#Ff6600] mr-2" />
                        <span className="text-red-600 font-bold">IMPORTANTE:</span> Este precio se basa en la página oficial de la Federación Nacional de Cafeteros de Colombia.
                      </div>
                    </div>
                   
                    </>
                  )}

                  {data.tipo=="Empresa_Envios" &&(
                    <div className="flex justify-center items-center shadow-2xl  border-1 border-gray-300  rounded-2xl h-[56%] mt-16">
                          <p className="flex justify-center items-center text-[#Ff6600]  text-2xl font-bold drop-shadow ">En jeva Coffe lo mas importante es nuestros Clientes</p>
                    </div>
                  )}
                  {data.tipo=="Clientes" &&(
                    <div className="flex justify-center items-center shadow-2xl  border-1 border-gray-300  rounded-2xl h-[56%] mt-16">
                         {numbersales > 0 ?(
                          <p className="flex justify-center items-center text-[#Ff6600]  text-2xl font-bold drop-shadow ">{numbersales}</p>
                         ):(
                          <p className="flex justify-center items-center text-[#Ff6600]  text-2xl font-bold drop-shadow ">No has Comprado nada aun </p>
                         )}
                        
                        
                    </div>
                  )}

                  
                </div>
              </div>
              <div>
                {data.tipo=="Clientes" &&(
                    <div className=" shadow-2xl  border-1 border-gray-300  rounded-2xl  mt-16 relative sm:left-12 md: md:w-[90%] p-10 ">
                          <p className="flex justify-center items-center text-[#Ff6600]  text-2xl font-bold drop-shadow ">Tus Compras son importantes para nosotros</p>
                          <SearchBar
                          onChange={(e)=>setsearcher(e.target.value)}
                          value={searcher}
                          placeholder="Buscar por nombre del producto"
                          />
                          <select name="" onChange={(e)=>setEstadoFiltro(e.target.value)} value={estadoFiltro} className="p-2 rounded-lg dark:border-1  border-gray-300 m-4 border-[#003333]">
                            <option value="todos">Todos</option>
                            <option value="Por Entregar">Por Entregar</option>
                            <option value="Entregado">Entregados</option>
                          </select>
                         <div className="sm: grid-cols-1 md:grid grid-cols-3 gap-7 ">
                           {filterdata().map((item=>{
                            let imagenes =[];
                          try {
                            if (item.imagen && item.imagen.trim().startsWith('[')){ 
                              imagenes = JSON.parse(item.imagen);
                            }else if (item.imagen) {
                              imagenes = [item.imagen];
                            }
                          } catch (error) {
                            console.error("Error al parsear la imagen:", error);
                          }
                            return(
                            <div className="border border-[#003333] dark:border-white max-w-xs rounded-2xl h-auto p-4 flex flex-col items-center">
                              <p className="mb-2 text-center"><strong>Nombre del Producto:</strong> {item.nombre_producto}</p>
                              <img src={`${baseurl}/img/${imagenes[0]}`} alt={imagenes[0]} className="rounded-lg shadow-md w-full h-auto mb-2" />
                              <p className="mb-1 text-center"><strong>Estado:</strong> {item.estado}</p>
                              <p className="mb-1 text-center"><strong>Fecha de Compra:</strong> {formatDate(item.fecha_venta)}</p>
                              <p className="mb-1 text-center"><strong>Precio:</strong> ${item.valor_venta}</p>
                              <p className="mb-1 text-center"><strong>Departamento:</strong> {item.departamento}</p>
                              <p className="mb-1 text-center"><strong>Municipio:</strong> {item.municipio}</p>
                              <p className="mb-1 text-center"><strong>Direccion:</strong> {item.direccion}</p>
                              {item.estado=="Por Entregar" ?(
                                <p className="mb-1 text-center"> <strong>Unidades Encargadas:</strong> {item.numero_de_unidades_compradas}</p>
                              ):(
                                <p className="mb-1 text-center"><strong>Unidades Compradas</strong> {item.numero_de_unidades_compradas}</p>
                              )}
                            </div>
                            )
                            }))}                              
                         </div>
                    </div>
                  )}
              </div>
              </>
            ))}
          </main>
          {updateuser && <Edit_user onclose={closemodal} data={datauser} />}
        </div>
        <Contact />
      </>
    );

};
