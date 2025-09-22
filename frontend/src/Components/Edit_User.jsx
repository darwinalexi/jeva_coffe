import { faClose, faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import ImageUploadPreview from "./Inpuimage"
import axiosClient from "../utils/axiosClient"
import Swal from "sweetalert2"

export const Edit_user = ({ data, onclose }) => {
  const scrollStyle = { scrollbarWidth: "none" }

  const [Nombre, setNombre] = useState(data.nombre);
  const [Correo, setCorreo] = useState(data.correo);
  const [Descripcion, setDescripcion] = useState(data.descripcion);
  const [Edad, setEdad] = useState(data.edad);
  const [image, setimage] = useState(null); 
  const [Clave, setClave] = useState("");
  const [Tipo, setTipo] = useState(data.tipo);
  const [open, setopen]= useState(false);
  const [typeusere, setuser]= useState("");
  const [Celular, setCelular]= useState(data.celular)
  const handleimage = (file) => {
    setimage(file);
  };


  useEffect(()=>{
     let datalocaluser= JSON.parse(localStorage.getItem('usuario'));
      if (datalocaluser && datalocaluser.tipo) {
        setuser(datalocaluser.tipo)
      }
  },[])
  const openpas= () => {
    setopen(true);
  };

  const updateuser = async (e) => {
    e.preventDefault();
    try {      
      const formData = new FormData();
      if (Nombre) formData.append("nombre", Nombre);
      if (Correo) formData.append("correo", Correo);
      if (Clave) formData.append("clave", Clave);
      if (Descripcion) formData.append("descripcion", Descripcion);
      if (Tipo) formData.append("tipo", Tipo);
      if (Edad) formData.append("edad", Edad);
      if (Celular) formData.append('celular', Celular);
       if (image) formData.append("imagen", image);
        formData.forEach((value,key)=>{
          console.log("valores", key, value)
        })
        const update = await axiosClient.put(`/usuarios/${data.identificacion}`,formData,);

          if (update.status === 200) {
            Swal.fire({
              icon: "success",
              text: update.data.message,
            });
            window.location.reload();
          } else {
            Swal.fire({
              icon: "error",
              text: "No se pudo actualizar",
            });
          } 
    } catch (e) {
      console.log(e)
      if (e.response && e.response.status === 400) {
        const errores = e.response.data.errores;
        const mensaje = errores.map(err => err.msg).join(', ');
        Swal.fire({
          icon: 'error',
          text: `Error ${mensaje}`,
        });
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Ocurrió un error al actualizar el producto.',
        });
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        className="bg-white rounded-2xl p-8 w-full max-w-2xl relative shadow-lg overflow-scroll h-[80%] dark:bg-gray-800"
        style={scrollStyle}
      >
        <div className="grid grid-cols-2 gap-12">
          <div>
            <h1 className="text-[#003333] font-bold text-4xl dark:text-white">Editar Usuario</h1>
          </div>
          <div className="relative left-[23%]">
            <FontAwesomeIcon
              className="size-8 text-red-800 relative left-[62%] cursor-pointer dark:text-white"
              onClick={onclose}
              icon={faClose}
            />
          </div>
          <form
            className="w-[90%] mt-16 absolute top-[15%]"
            onSubmit={updateuser}
          >
            <div className="w-full flex flex-col mb-4">
              <label>Ingrese El Nombre Completo:</label>
              <input
                type="text"
                onChange={(e) => setNombre(e.target.value)}
                value={Nombre}
                className="focus:outline-none border-2 border-[#003333] p-2 rounded-xl"
              />
            </div>

            <div className="w-full flex flex-col mb-4">
              <label>Ingrese El Correo:</label>
              <input
                type="email"
                onChange={(e) => setCorreo(e.target.value)}
                value={Correo}
                className="focus:outline-none border-2 border-[#003333] p-2 rounded-xl"
              />
            </div>
        
            <div className="w-full flex flex-col mb-4">
              <label>Descripción:</label>
              <input
                type="text"
                onChange={(e) => setDescripcion(e.target.value)}
                value={Descripcion}
                className="focus:outline-none border-2 border-[#003333] p-2 rounded-xl"
              />
            </div>

             <div className="w-full flex flex-col mb-4">
              <label>Celular: </label>
              <input
                type="number"
                onChange={(e) => setCelular(e.target.value)}
                value={Celular}
                className="focus:outline-none border-2 border-[#003333] p-2 rounded-xl"
              />
            </div>
            
              <div className="w-full flex flex-col mb-4">
              <label>Edad:</label>
              <input
                type="number"
                onChange={(e) => setEdad(e.target.value)}
                value={Edad}
                className="focus:outline-none border-2 border-[#003333] p-2 rounded-xl"
              />
            </div>

            <div className="w-full flex flex-col mb-4">
              <label>Clave (opcional):</label>
              <input
                type={open ? "text" : "password"}
                onChange={(e) => setClave(e.target.value)}
                placeholder="(opcional) Solo Si Deseas Cambiar Tu Clave"
                className="focus:outline-none border-2 border-[#003333] p-2 rounded-xl"
              />
              <button
                type="button"
                onClick={() => setopen((prev) => !prev)}
              >
              <FontAwesomeIcon icon={open ? faEye : faEyeSlash}
               className="text-2xl text-default-400 flex-shrink-0 text-gray-400 relative bottom-8 sm: left-52 md:left-64"
               />
              </button>
            </div>

            <div className="mb-6">
              <ImageUploadPreview onImageChange={handleimage} />
            </div>

            <input
              type="submit"
              value="Editar Mi Información"
              className="p-3 m-3 rounded-2xl border-2 border-red-700 hover:text-white hover:bg-red-700 cursor-pointer relative sm: left-[29%] md:left-[34%]"
            />
          </form>
        </div>
      </div>
    </div>
  );
};
