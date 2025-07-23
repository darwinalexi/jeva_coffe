import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import axiosClient from "../utils/axiosClient";
import { useEffect, useState } from "react";

export const Buys = ({ onclose, data }) => {
  const [databuy, setbuy] = useState(data || "");
  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState("");
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState("");
  const [clients, setclient] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState("");
  const [direccion, setDireccion] = useState("");

  useEffect(() => {
    client();
    cargarDepartamentos();
  }, []);

  const client = async () => {
    try {
      const show = await axiosClient.get("/ver_cliente");
      setclient(show.data);
    } catch (e) {
      console.log(e);
    }
  };

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

  const handleRegistrarVenta = async () => {
    if (
      !clienteSeleccionado ||
      !departamentoSeleccionado ||
      !municipioSeleccionado ||
      !direccion
    ) {
      alert("Por favor complete todos los campos obligatorios.");
      return;
    }

    const payload = {
      productos: databuy.productos.map((p) => ({
        id_producto: p.id_producto,
        unidades_compradas: p.unidades_compradas,
      })),
      id_cliente: clienteSeleccionado,
      fecha_venta: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
      valor_venta: databuy.valor_total_venta,
      departamento_id: departamentoSeleccionado,
      municipio_id: municipioSeleccionado,
      direccion: direccion,
    };

    try {
      const res = await axiosClient.post("/crear_venta", payload);
      alert("Venta registrada con éxito.");
      onclose();
    } catch (error) {
      console.error("Error registrando venta:", error);
      alert("Error al registrar la venta.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-2xl relative shadow-lg overflow-scroll h-[80%] scrollbar-hide">
        <div className="flex justify-between items-center mb-6 border-b pb-2 border-[#003333]">
          <h1 className="text-3xl font-bold text-[#003333]">Registrar Venta</h1>
          <FontAwesomeIcon
            icon={faClose}
            onClick={onclose}
            className="text-[#003333] hover:text-red-600 cursor-pointer text-xl"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold text-[#003333]">Cliente:</label>
          <select
            value={clienteSeleccionado}
            onChange={(e) => setClienteSeleccionado(e.target.value)}
            className="w-full bg-[#003333] text-white p-2 rounded"
          >
            <option value="" disabled>
              Seleccione el Cliente que va a Comprar
            </option>
            {clients.map((item) => (
              <option key={item.identificacion} value={item.identificacion}>
                {item.nombre}
              </option>
            ))}
          </select>
        </div>
  
        <div className="mb-4">
          <label className="block mb-1 font-semibold text-[#003333]">Dirección:</label>
          <input
            type="text"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003333]"
            placeholder="Ej: Calle 123 #45-67"
          />
        </div>


        <div className="mb-4">
          <label className="block mb-1 font-semibold text-[#003333]">Departamento:</label>
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
          <label className="block mb-1 font-semibold text-[#003333]">Municipio:</label>
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
          <label className="block mb-2 font-semibold text-[#003333]">Productos a comprar:</label>
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

        <p className="mt-4 font-bold text-[#003333]">
          Total a pagar:{" "}
          {Number(databuy.valor_total_venta).toLocaleString("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 3,
          })}
        </p>


        <div className="mt-6">
          <button
            onClick={handleRegistrarVenta}
            className="w-full bg-red-700 text-white font-semibold py-2 rounded hover:bg-red-800 transition"
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};
