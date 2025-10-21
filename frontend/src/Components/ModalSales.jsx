import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import axiosClient from "../utils/axiosClient";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Facture } from "../Components/Facture";
import { pdf } from "@react-pdf/renderer";

export const Buys = ({data, onclose}) => {

  const [databuy, setbuy] = useState(data || "");
  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState("");
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState("");
  const [direccion, setDireccion] = useState("");
  const [productos, setproductos]=useState(data.productos); 
  const [nombre_cliente, setNombreCliente] = useState("");
  const [apellidos_cliente, setApellidosCliente] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [isAuth,setAuth]=useState(false);
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
  direccion,
  nombre_cliente: isAuth ? name : nombre_cliente,
  apellidos_cliente: isAuth ? "" : apellidos_cliente,
  valorventa,
  correo,
  celular: telefono,
  ...(isAuth && { id_cliente: clienteSeleccionado })

});



  useEffect(() => {

    if (!productos) return;

    const productosConSubtotal = productos.map(p => ({
      ...p,
      subtotal: Number(p.unidades_compradas) * Number(p.valor_unitario.replace(/\./g, ""))
    }));

    
  

    const totalVenta = productos.reduce(
  (acc, p) => acc + p.unidades_compradas * Number(p.valor_unitario.replace(/\./g, "")),
  0
);

setventa(totalVenta); 

    setdata({
      productos: productos.map(p => ({
        id_producto: p.id_producto,
        unidades_compradas: p.unidades_compradas
      })),
      fecha_venta: new Date().toISOString().slice(0, 10),
      departamento_id: departamentoSeleccionado,
      municipio_id: municipioSeleccionado,
      direccion,
      nombre_cliente: isAuth ? name : nombre_cliente,
      apellidos_cliente: isAuth ? "" : apellidos_cliente,
      correo,
      valorventa:totalVenta,
      celular: telefono,
      ...(isAuth && { id_cliente: clienteSeleccionado })
    });
  }, [
    productos,
    departamentoSeleccionado,
    municipioSeleccionado,
    direccion,
    nombre_cliente,
    apellidos_cliente,
    correo,
    valorventa,
    telefono,
    isAuth,
    clienteSeleccionado
  ]);





 

  useEffect(() => {
    const datalocal = JSON.parse(localStorage.getItem("usuario"));
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
  }, []);


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


  const onlinetext = (valor) => {
  const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
  if (valor === "" || regex.test(valor)) {
    return true;
  } else {
    Swal.fire({
      icon: "error",
      title: "Entrada no válida",
      text: "Solo se permiten letras y espacios.",
      confirmButtonText: "Aceptar"
    });
    return false;
  }
};

 const create_buy = async (e) => {
  e.preventDefault();

  try {
    const gen = await axiosClient.post("/generar_firma", {
      valorventa: datasend.valorventa,
    });

    const { reference, signatureIntegrity, amountInCents, currency } = gen.data;

    // 2️⃣ Abrir el widget de Wompi con los datos firmados
    const checkout = new window.WidgetCheckout({
      currency,
      amountInCents,
      reference,
      "signature:integrity": signatureIntegrity,
      publicKey: "pub_prod_p8u3NjzT7ZXTKyowdkChA9nEeLR7QjOp", 
    });

    checkout.open(async (result) => {
      const transaction = result.transaction;
      console.log("🧾 Resultado de la transacción:", transaction);

      if (transaction.status === "APPROVED") {
        const datasendFinal = {
          ...datasend,
          reference, 
          transaction_id: transaction.id, 
        };

        const res = await axiosClient.post("/crear_venta", datasendFinal);

        Swal.fire({
          title: "Éxito",
          text: res.data.mensaje,
          icon: "success",
          confirmButtonText: "Aceptar",
        }).then(async () => {

          const blob = await pdf(<Facture data={databuy} dataprice={datasend} />).toBlob();
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "Factura.pdf";
          a.click();
          URL.revokeObjectURL(url);
        });
      } else {
        Swal.fire({
          icon: "warning",
          title: "Pago no completado",
          text: "La transacción fue cancelada o falló.",
        });
      }
    });
  } catch (error) {
    console.error("❌ Error procesando la compra:", error);
    Swal.fire({
      icon: "error",
      title: "Error al procesar la compra",
      text: error.response?.data?.mensaje || error.message,
    });
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
                      onChange={(e)=>{
                        if (onlinetext(e.target.value) || e.target.value) {
                           setNombreCliente(e.target.value)
                      }
                      }}
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003333]"
                      placeholder="Ingrese su nombre"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block mb-1 font-semibold text-[#003333] dark:text-white">Ingresa tus Apelliidos:</label>
                    <input
                      type="text"
                      required
                      onChange={(e)=>{
                        if (onlinetext(e.target.value) || e.target.value) {
                           setApellidosCliente(e.target.value)
                      }
                      }}
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
              <label className="block mb-1 font-semibold text-[#003333] dark:text-white">Departamento:</label>
              <select
                  value={departamentoSeleccionado}
                  onChange={handleDepartamentoChange}
                  required
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
                rrequired
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
                required
                onChange={(e) => setDireccion(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003333]"
                placeholder="Ej: Calle 123 #45-67"
              />
            </div>

        
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
