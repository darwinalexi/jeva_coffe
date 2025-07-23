import ImageUploadPreview from "./Inpuimage"
import { useEffect, useState } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import axiosClient from "../utils/axiosClient";
export const Create_Product=({onclose})=>{
  const [nombre, setnombre] = useState("");
  const [unidades_disponibles, setdisponibles] = useState();
  const [precio, setprecio] = useState();
  const [estado, setestado] = useState();
  const [image, setImage] = useState();
  const [descripcion, setdescripcion] = useState("");
  const [identificacion, setidentificacion]= useState("");
  
  const handleImageChange = (file) => {
    setImage(file);
  };

  useEffect(()=>{
        const data= JSON.parse(localStorage.getItem('usuario'));
        const id= data.identificacion;
        setidentificacion(id);
  },[])
    

    const formatPrice = (value) => {
    // Eliminar cualquier carácter que no sea un número
    const numberValue = value.replace(/[^0-9]/g, '');
    // Formatear el número con comas
    return new Intl.NumberFormat().format(numberValue);
  };
    const scrollStyle={
        scrollbarWidth:'none'
    }



     const create_products = async (e) => {
        e.preventDefault();
    
        // Convertir unidades disponibles a número
        const unidades = Number(unidades_disponibles);
        if (unidades < 1) {
          Swal.fire({
            icon: 'warning',
            text: 'Lo sentimos, pero las unidades deben ser un mínimo de uno, no puede ser 0 o menos.'
          });
          return;
        }
    
        try {
          const formData = new FormData();
          formData.append('nombre', nombre);
          formData.append('unidades_disponibles', unidades);
          formData.append('precio', precio);
          formData.append('estado', estado);
          formData.append('descripcion', descripcion);
          if (image) {
            formData.append("imagen", image);
          }
          formData.append('usuario_id', identificacion);
    
          const update = await axiosClient.post(`/productos`, formData);
          if (update.status === 200) {
            Swal.fire({
              icon: 'success',
              text: update.data.mensaje
            });
            window.location.reload();
          }
        } catch (e) {
          if (e.response && e.response.status === 400) {
            const errores = e.response.data.errores;
            const mensajes = errores.map(err => err.msg).join(', ');
            Swal.fire({
              icon: 'error',
              text: `Error ${mensajes}`,
            });
          } else {
            Swal.fire({
              icon: 'error',
              text: 'Ocurrió un error al crear el producto.',
            });
          }
        }
      };
    return(
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl p-8 w-full max-w-2xl relative shadow-lg overflow-scroll h-[80%]" style={scrollStyle}>
                 <div className="flex justify-between items-center mb-6 border-b pb-2 border-[#003333]">
                          <h1 className="text-3xl font-bold text-[#003333]">Crear Producto</h1>
                          <FontAwesomeIcon
                            icon={faClose}
                            onClick={onclose}
                            className="text-[#003333] hover:text-red-600 cursor-pointer text-xl"
                          />
                        </div>
                
                        <form className="flex flex-col gap-4 text-[#003333]" onSubmit={create_products} >
                          <div>
                            <label className="block font-semibold mb-1">Nombre</label>
                            <input
                              type="text"
                              placeholder="Ingrese el nombre"
                              value={nombre}
                              onChange={(e) => setnombre(e.target.value)}
                              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003333]"
                            />
                          </div>
                
                          <div>
                            <label className="block font-semibold mb-1">Unidades Disponibles</label>
                            <input
                            
                              type="number"
                              placeholder="Ingrese unidades disponibles"
                              value={unidades_disponibles}
                              onChange={(e) => setdisponibles(e.target.value)}
                              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003333]"
                            />
                          </div>
                
                          <div>
                            <label className="block font-semibold mb-1">Precio</label>
                            <input
                              type="text"
                            
                              placeholder="Ingrese el precio"
                              value={precio}
                              onChange={(e) => setprecio(formatPrice(e.target.value))}
                              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003333]"
                            />
                          </div>
                
                          <div>
                            <label className="block font-semibold mb-1">Descripción</label>
                            <input
                              type="text"
                              placeholder="Ingrese una Descripción"
                              value={descripcion}
                              onChange={(e) => setdescripcion(e.target.value)}
                              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003333]"
                            />
                          </div>
                
                          <div>
                            <label className="block font-semibold mb-1">Estado</label>
                            <select
                              value={estado}
                              onChange={(e) => setestado(e.target.value)}
                              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003333]"
                            >
                              <option value="hidden" >Seleccione un estado</option>
                              <option value="Disponible">Disponible</option>
                              <option value="No Disponible">No Disponible</option>
                            </select>
                          </div>
                
                          <div>
                            <label className="block font-semibold mb-1">Imagen</label>
                            <ImageUploadPreview onImageChange={handleImageChange} />
                          </div>
                
                          <button
                            type="submit"
                            className="mt-4 bg-red-800     text-white py-2 rounded-md hover:bg-[#005555] transition duration-200"
                          >
                            Crear Producto
                          </button>
                        </form>
            </div>    
        </div>
        
    )
}