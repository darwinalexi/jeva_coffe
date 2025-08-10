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
import { DarkMode } from "../Components/DarkMode";
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
        
        buys_client();
    }, []);

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
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-800 text-black dark:text-white transition-colors duration-300">
      <NavBar />

      <main className="flex-grow">
        {usuario.map((data) => (
          <div key={data.identificacion} className="p-4">
            <h1 className="text-2xl font-bold text-center mb-6">Perfil de Usuario</h1>
            <div className="flex-2 inline-flex  sm: ml-24 md:relative left-[35%] md:w-[30%]">
              {data.imagen.length>0 ?(
                   <Imagen
                name={data.imagen}
                className="w-64 h-64 object-cover rounded-lg shadow-md"
              />
              ):(
                <p>No Hay Imagen De Perfil</p>
              )}
             
              <div className="mt-4 space-y-2 text-lg">
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
                <DarkMode />
                <button
                  className="bg-[#FF6600] hover:bg-[#FF6600] transition-colors text-white px-6 py-3 rounded-lg mt-4"
                  onClick={() => openmodal(data)}
                >
                  Editar información
                </button>
              </div>
            </div>

            {data.tipo === "Clientes" && (
              <div className="mb-16">
                <h2 className="text-xl font-semibold text-center">Tus Compras</h2>
                <SearchBar
                  onChange={(e) => setsearcher(e.target.value)}
                  placeholder="Buscar producto..."
                  value={searcher}
                  className="my-4 w-full max-w-md mx-auto"
                />
                <select
                  onChange={(e) => setEstadoFiltro(e.target.value)}
                  value={estadoFiltro}
                  className="border border-[#003333] rounded px-3 py-1 mb-4 m-4"
                >
                  <option value="todos">Todos</option>
                  <option value="Por Entregar">Por Entregar</option>
                  <option value="Entregado">Entregado</option>
                </select>

                {buys.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {filterdata().map((item, index) => (
                      <div key={index} className="bg-gray-200 p-4 rounded-lg dark:bg-gray-900 shadow">
                        <p><strong>Producto:</strong> {item.nombre_producto}</p>
                        <img
                          src={`${baseurl}/img/${item.imagen}`}
                          alt={item.imagen}
                          className="w-full h-40 object-cover rounded"
                        />
                        <p><strong>Cliente:</strong> {item.nombre_cliente}</p>
                        <p><strong>Departamento:</strong> {item.departamento}</p>
                        <p><strong>Municipio:</strong> {item.municipio}</p>
                        <p><strong>Dirección:</strong> {item.direccion}</p>
                        <p><strong>Estado:</strong> {item.estado}</p>
                        <p><strong>Fecha:</strong> {formatDate(item.fecha_venta)}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center mt-6">No has realizado compras aún.</p>
                )}
              </div>
            )}

            
            {data.tipo === "Administrador" && (
              <div className="bg-gray-300 dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-12">
                <img src={federacion} className="w-full max-w-md mx-auto" alt="Federación" />
                <p className="text-center text-xl font-semibold mt-4">
                  Precio del Café Pergamino seco por carga de 125 kg: <br />
                  <span className="text-green-700 dark:text-white text-3xl font-bold">
                    ${Number(price).toLocaleString("es-CO")}
                  </span>
                  <br />
                  <span className="text-sm text-gray-500">Fecha: {date}</span>
                </p>
                <div className="mt-4 bg-white border-l-4 border-[#Ff6600] p-4 rounded-lg shadow dark:bg-gray-800">
                  <FontAwesomeIcon icon={faWarning} className="text-[#Ff6600] mr-2" />
                  <span className="text-red-600 font-bold">IMPORTANTE:</span> Este precio se basa en la página oficial de la Federación Nacional de Cafeteros de Colombia.
                </div>
              </div>
            )}

            {data.tipo === "Empresa_Envios" && (
              <p className="text-center text-lg font-bold">Empresa de Envíos: Envios</p>
            )}
          </div>
        ))}
      </main>

      {updateuser && <Edit_user onclose={closemodal} data={datauser} />}
      
      <Contact />
    </div>
  </>
);

};
