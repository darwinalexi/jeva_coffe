import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import axiosClient from "../utils/axiosClient";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export const Buys = ({data, onclose}) => {

  const [databuy, setbuy] = useState(data || "");
  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState("");
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState("");
  const [paisesleccionado, setpseleccionado]= useState(null)
  const [direccion, setDireccion] = useState("");
  const [countries, setcountries]=useState([]);
  const [productos, setproductos]=useState(data.productos); 
  const [nombre_cliente, setNombreCliente] = useState("");
  const [apellidos_cliente, setApellidosCliente] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [isAuth,setAuth]=useState(false);
  const [region, setRegion] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [valorventa, setventa]= useState()
  const [clienteSeleccionado, setClienteSeleccionado] = useState([]);
  const [token, settoken]= useState("")
  const [name, setname]= useState("")

const [datasend, setdata] = useState({
  productos: productos.map(p => ({
    id_producto: p.id_producto,
    unidades_compradas: p.unidades_compradas
  })),
  fecha_venta: new Date().toISOString().slice(0, 10),
  departamento_id: departamentoSeleccionado,
  municipio_id: municipioSeleccionado,
  idpais: paisesleccionado?.id || null,
  direccion,
  nombre_cliente,
  ...(isAuth && {nombre_cliente:name}),
  apellidos_cliente,
  valorventa,
  correo,
  region,
  ciudad,
  celular: telefono,
  ...(isAuth && { id_cliente: clienteSeleccionado })
  
});



  useEffect(() => {

    if (!productos) return;

    const productosConSubtotal = productos.map(p => ({
      ...p,
      subtotal: Number(p.unidades_compradas) * Number(p.valor_unitario.replace(/\./g, ""))
    }));

    
  

    const totalVenta = productosConSubtotal.reduce((acc, item) => acc + item.subtotal, 0);
    
    const totalformateado= totalVenta.toLocaleString("es-CO", {
      minimumFractionDigits: 0
    })
    setventa(totalformateado);
    setdata({
      productos: productos.map(p => ({
        id_producto: p.id_producto,
        unidades_compradas: p.unidades_compradas
      })),
      fecha_venta: new Date().toISOString().slice(0, 10),
      departamento_id: departamentoSeleccionado,
      municipio_id: municipioSeleccionado,
      idpais: paisesleccionado?.id || null,
      direccion,
      nombre_cliente,
      ...(isAuth && {nombre_cliente:name}),
      apellidos_cliente,
      correo,
      region,
      ciudad,
      valorventa,
      celular: telefono,
      ...(isAuth && { id_cliente: clienteSeleccionado })
    });
  }, [
    productos,
    departamentoSeleccionado,
    municipioSeleccionado,
    paisesleccionado,
    direccion,
    nombre_cliente,
    apellidos_cliente,
    correo,
    region,
    valorventa,
    ciudad,
    telefono,
    isAuth,
    clienteSeleccionado
  ]);



    if (isAuth) {
          datasend.id_cliente=clienteSeleccionado
    }

  const countrie=async()=>{
    const countries = await axiosClient.get("/countries");
    setcountries(countries.data);
    console.log("data",countries.data);
  }

  useEffect(() => {
    const datalocal = JSON.parse(localStorage.getItem("Cliente"));
    const idcliente =  datalocal ? datalocal.identificacion  || null: null;
    const nameclient= datalocal? datalocal.nombre || null: null
    setname(nameclient)
    console.log(nameclient)
    const token = localStorage.getItem('token');
    if (token) {
        settoken(token);
    }
    setClienteSeleccionado(idcliente);

    if (datalocal) {
      setAuth(true);
      setdata(prev => ({
        ...prev,
        id_cliente: clienteSeleccionado
      }));
    }


  }, [isAuth, clienteSeleccionado]);


  useEffect(() => {
    cargarDepartamentos();
    countrie();
  }, []);

  useEffect(() => {
  setdata(prev => ({
    ...prev,
    idpais: paisesleccionado?.id || null
  }));
}, [paisesleccionado]);
  const cargarDepartamentos = async () => {
    try {
      
      const res = await axiosClient.get("/departamentos");
      setDepartamentos(res.data);
    } catch (error) {
      console.error("Error cargando departamentos:", error);
    }
  };

  const cargarMunicipios = async (id_departamento) => {
    try {
      const res = await axiosClient.get(`/seleccionar_municipio/${id_departamento}`);
      setMunicipios(res.data);
    } catch (error) {
      console.error("Error cargando municipios:", error);
    }
  };


  
  const handleDepartamentoChange = (e) => {
    const id = e.target.value;
    setDepartamentoSeleccionado(id);
    setMunicipioSeleccionado("");
    cargarMunicipios(id);
  };

  const create_buy = async (e) => {
    e.preventDefault();
    try {       
       console.log("payload", datasend)
      const res = await axiosClient.post("/crear_venta", datasend);
     if (res.status==200) {
       Swal.fire({
        title: "Éxito",
        text: "Venta registrada con éxito.",
        icon: "success",
        confirmButtonText: "Aceptar"
      })
      window.location.reload();
    }
    } catch (error) {
      console.error("Error registrando venta:", error);

    }
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 w-full max-w-2xl relative shadow-lg overflow-scroll h-[80%] scrollbar-hide">
        <div className="flex justify-between items-center mb-6 border-b pb-2 border-[#003333]">
          <h1 className="text-3xl font-bold text-[#003333] dark:text-white">Registrar Venta</h1>
          <FontAwesomeIcon
            icon={faClose}
            onClick={onclose}
            className="text-[#003333] hover:text-red-600 cursor-pointer text-xl dark:text-white"
          />
        </div>

      <form onSubmit={create_buy}>
      {token ? (
        <>
      </>
      ):(
          <>
                  <div className="mb-4">
                    <label className="block mb-1 font-semibold text-[#003333] dark:text-white">Ingresa tus Nombre:</label>
                    <input
                      type="text"
                      value={nombre_cliente}
                      required
                      onChange={(e) => setNombreCliente(e.target.value)}
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003333]"
                      placeholder="Ingrese su nombre"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block mb-1 font-semibold text-[#003333] dark:text-white">Ingresa tus Apelliidos:</label>
                    <input
                      type="text"
                      required
                      onChange={(e) => setApellidosCliente(e.target.value)}
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003333]"
                      placeholder="Ingrese su apellido"
                    />
                  </div>

              </>
      )}
      <>
            <div className="mb-4">
              <label className="block mb-1 font-semibold text-[#003333] dark:text-white">Ingresa tu No° de Telefono:</label>
              <input
                type="number"
                required
                onChange={(e) => setTelefono(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003333]"
                placeholder="Ingrese su telefono"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-semibold text-[#003333] dark:text-white">Ingresa tu Correo:</label>
              <input
                type="email"
                required
                onChange={(e) => setCorreo(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003333]"
                placeholder="Ingrese su Correo"
              />
            </div>

           <div className="mb-4">
            <label className="block mb-1 font-semibold text-[#003333] dark:text-white">País:</label>
            <select  
            required
              value={paisesleccionado?.id || ""}
              onChange={(e) => {
                const country = countries.find(c => c.id === parseInt(e.target.value));
                setpseleccionado(country || null); 
                setDepartamentoSeleccionado("");
                setMunicipioSeleccionado("");
              }}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003333]"
            >
              <option value="" disabled>Seleccione un país</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.nombre}
                </option>
              ))}
            </select>
          </div>



          {paisesleccionado?.nombre==="Colombia" ?(
          <>
            <div className="mb-4">
              <label className="block mb-1 font-semibold text-[#003333] dark:text-white">Departamento:</label>
              <select
                  value={departamentoSeleccionado}
                  onChange={handleDepartamentoChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003333]"
                >

                <option value="" disabled>Seleccione un departamento</option>
                {departamentos.map((dep) => (
                  <option key={dep.id_departamento} value={dep.id_departamento}>
                    {dep.departamento}
                  </option>
                ))}
              </select>
            </div>
            

            <div className="mb-4">
              <label className="block mb-1 font-semibold text-[#003333] dark:text-white">Municipio:</label>
              <select
                value={municipioSeleccionado}
                onChange={(e) => setMunicipioSeleccionado(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003333]"
              >
                <option value="" disabled>Seleccione un municipio</option>
                {municipios.map((mun) => (
                  <option key={mun.id_municipio} value={mun.id_municipio}>
                    {mun.municipio}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-semibold text-[#003333] dark:text-white">Dirección:</label>
              <input
                type="text"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003333]"
                placeholder="Ej: Calle 123 #45-67"
              />
            </div>
          </>
          ):(
          <>
            <div className="mb-4">
              <label className="block mb-1 font-semibold text-[#003333] dark:text-white">Región departamento o estado:</label>
              <input
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003333]"
                placeholder="Ingrese su estado o departamento de residencia"
              />
            </div>


            <div className="mb-4">
              <label className="block mb-1 font-semibold text-[#003333] dark:text-white">Ciudad o municipio:</label>
              <input
                type="text"
                value={ciudad}
                onChange={(e) => setCiudad(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003333]"
                placeholder="Ingrese su ciudad o municipio de residencia"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-semibold text-[#003333] dark:text-white">Direccion:</label>
              <input
                type="text"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003333]"
                placeholder="Ingrese su dirección a donde desea que llegue el pedido"
              />
            </div>
          
          </>

          
    )}

        
            <div className="mb-4">
              <label className="block mb-2 font-semibold text-[#003333] dark:text-white">Productos a comprar:</label>
              {databuy.productos?.map((item, index) => (
                <div key={index} className="border p-2 rounded mb-2 shadow-sm">
                  <p><strong>Producto:</strong> {item.nombre}</p>
                  <p><strong>Unidades:</strong> {item.unidades_compradas}</p>
                  <p><strong>Valor unitario:</strong> ${item.valor_unitario}</p>
                  <p>
                    <strong>Subtotal:</strong>{" "}
                    {Number(item.subtotal).toLocaleString("es-CO", {
                      style: "currency",
                      currency: "COP",
                      minimumFractionDigits: 3,
                    })}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-4 font-bold text-[#003333] dark:text-white">
              Total a pagar:{" "}
              {Number(databuy.valor_total_venta).toLocaleString("es-CO", {
                style: "currency",
                currency: "COP",
                minimumFractionDigits: 3,
              })}
            </p>


            <div className="mt-6">
              <input
                type="submit"
                className="w-full bg-red-700 text-white font-semibold py-2 rounded hover:bg-red-800 transition"
              />
            </div>
</>
      </form>
      </div>
    </div>
  );
};
