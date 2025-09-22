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
  const [cantidad, setcantidad] = useState("");
  const [tueste, settueste] = useState("");
  const [variedad, setvariedad] = useState("");
  const [aroma, setaroma] = useState("");
  const [sabor, setsabor] = useState("");
  const [identificacion, setidentificacion]= useState("");
  const [cuerpo, setcuerpo] = useState("");
  

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
    
        const unidades = Number(unidades_disponibles);
        if (unidades < 1) {
          Swal.fire({
            icon: 'warning',
            text: 'Lo sentimos, pero las unidades deben ser un mínimo de uno, no puede ser 0 o menos.'
          });
          return;
        }
        
        if (!nombre || !unidades_disponibles || !precio || !estado || !descripcion || !cantidad || !tueste || !variedad || !aroma || !sabor || !identificacion || !cuerpo) {
          Swal.fire({
            icon:'warning',
            title:'Advertencia',
            text:'No has completado los campos requeridos'
          })
          return;
        }
        if (!image ) {
          Swal.fire({
            icon: 'warning',
            text: 'Por favor, sube al menos una imagen.'
          });
          return;
        }
        if (image.length > 5) {
          Swal.fire({
            icon: 'warning',
            text: 'Por favor, sube un máximo de 5 imágenes.'
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
          if (Array.isArray(image) && image.length > 0) {
            image.forEach(imagen => {
              formData.append('imagen', imagen);
            });
          }
          
          formData.append('usuario_id', identificacion);
          formData.append('cantidad', cantidad);
          formData.append('tueste', tueste);
          formData.append('variedad', variedad);
          formData.append('aroma', aroma);
          formData.append('sabor', sabor);
          formData.append('cuerpo', cuerpo);
          
        
    
          const update = await axiosClient.post(`/productos`, formData);
          if (update.status === 200) {
            Swal.fire({
              icon: 'success',
              text: update.data.mensaje
            });
            window.location.reload();
          }
        } catch (e) {
          console.error("Error al crear el producto:", e);
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
            <div className="bg-white rounded-2xl p-8 w-full max-w-2xl relative shadow-lg overflow-scroll h-[80%] dark:bg-gray-800" style={scrollStyle}>
              <div className="flex justify-between items-center mb-6 border-b pb-2 border-[#003333]">
                          <h1 className="text-3xl font-bold text-[#003333] dark:text-white">Crear Producto</h1>
                          <FontAwesomeIcon
                            icon={faClose}
                            onClick={onclose}
                            className="text-[#003333] hover:text-red-600 cursor-pointer text-xl  dark:text-white"
                          />
                        </div>
                
                        <form className="flex flex-col gap-4 text-[#003333] dark:text-white" onSubmit={create_products} >
                          <div>
                            <label className="block font-semibold mb-1 ">Nombre</label>
                            <input
                              type="text"
                              required
                              placeholder="Ingrese el nombre"
                              onChange={(e) => setnombre(e.target.value)}
                              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003333]"
                            />
                          </div>
                
                          <div>
                            <label className="block font-semibold mb-1">Unidades Disponibles</label>
                            <input
                            
                              type="number"
                              required
                              placeholder="Ingrese unidades disponibles"
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
                              required
                              onChange={(e) => setprecio(formatPrice(e.target.value))}
                              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003333]"
                            />
                          </div>
                
                          <div>
                            <label className="block font-semibold mb-1">Descripción</label>
                            <input
                              type="text"
                              required
                              placeholder="Ingrese una Descripción"
                              value={descripcion}
                              onChange={(e) => setdescripcion(e.target.value)}
                              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003333]"
                            />
                          </div>
                          <div>
                            <label className="block font-semibold mb-1">Aroma</label>
                            <input
                              type="text"
                              required
                              placeholder="Ingrese el aroma"
                              onChange={(e) => setaroma(e.target.value)}
                              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003333]"
                            />
                          </div>

                           <div>
                            <label className="block font-semibold mb-1">Cantidad</label>
                            <input
                              type="text"
                              required
                              placeholder="Ingrese la cantidad Ej. 250 kg"
                              onChange={(e) => setcantidad(e.target.value)}
                              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003333]"
                            />
                          </div>

                           <div>
                            <label className="block font-semibold mb-1">Sabor</label>
                            <input
                              type="text"
                              required
                              placeholder="Ingrese el sabor esperado por nuestros clientes"
                              onChange={(e) => setsabor(e.target.value)}
                              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003333]"
                            />
                          </div>
                
                         <div>
                            <label className="block font-semibold mb-1">Variedad</label>
                            <input
                              type="text"
                              required
                              placeholder="Ingrese la variedad Ej. Castilla"
                              onChange={(e) => setvariedad(e.target.value)}
                              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003333]"
                            />
                          </div>
                
                          <div>
                            <label className="block font-semibold mb-1">Estado</label>
                            <select
                              required
                              onChange={(e) => setestado(e.target.value)}
                              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003333]"
                            >
                              <option value="hidden" >Seleccione un estado</option>
                              <option value="Disponible">Disponible</option>
                              <option value="No Disponible">No Disponible</option>
                            </select>
                          </div>

                          <div>
                            <label className="block font-semibold mb-1">Estado de Tostión</label>
                            <select
                            required
                              onChange={(e) => settueste(e.target.value)}
                              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003333]"
                            >
                              <option value="hidden" >Seleccione un tipo de tostion</option>
                              <option value="Tueste_claro">Tueste Claro</option>
                              <option value="Tueste_medio">Tueste Medio</option>
                              <option value="Tueste_oscuro">Tueste Oscuro</option>
                            </select>
                          </div>

                          <div>
                            <label className="block font-semibold mb-1">cuerpo</label>
                            <select
                            required
                              onChange={(e) => setcuerpo(e.target.value)}
                              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003333]"
                            >
                              <option value="hidden" >Seleccione un tipo de cuerpo</option>
                              <option value="Cuerpo_ligero">Cuerpo Ligero</option>
                              <option value="Cuerpo_medio">Cuerpo Medio</option>
                              <option value="Cuerpo_oscuro">Cuerpo Intenso o Completo</option>
                            </select>
                          </div>
                
                          <div>
                            <label className="block font-semibold mb-1">Imagen</label>
                            <input type="file" accept="image/*" multiple
                            required 
                            className="border-1 border-[#003333] dark:border-white w-full p-5 rounded-xl"
                            onChange={(e) => setImage(Array.from(e.target.files))} />
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