import { faClose, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Swal from "sweetalert2";
import axiosClient from "../utils/axiosClient";

export const Change_password = ({ onclose }) => {
  const [data, setData] = useState({ 
    correo: "", 
    codigo: "" ,
    clave: ""
    });
  const [step, setStep] = useState("correo");
  const [opensee, setopen]= useState(false);

  const seepassword=()=>{
    setopen(false);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      const send = await axiosClient.post("/recuperar",data)
      if (send.status === 200) {
        Swal.fire({
          title: "Correo Enviado",
          text: send.data.mensaje,
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        setStep("codigo");
      } else {
        Swal.fire({
          title: "Error",
          text: send.data.mensaje,
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
        console.error("Error al enviar el correo:", error);
      Swal.fire({
        title: "Error",
        text: "Ha ocurrido un error al enviar el correo.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const verifyCode = async () => {
    try{
    const change= await axiosClient.post("/cambiar_clave", data);
    if (change.status === 200) {
      Swal.fire({
        title: "Contraseña Cambiada",
        text: change.data.mensaje,
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      onclose();
    }
  } catch (e) {
  if (!e.response) {
    Swal.fire({ icon: 'error', text: 'No se pudo conectar con el servidor' });
    return;
  }
  const { status, data } = e.response;
  let mensaje = "Error inesperado";
  if (data?.errores) {
    mensaje = data.errores.map(err => err.msg).join(', ');
  } else if (data?.mensaje) {
    mensaje = data.mensaje;
  } else if (data?.msg) {
    mensaje = data.msg;
  }
  Swal.fire({
    icon: 'error',
    title: `Error ${status}`,
    text: mensaje,
  });
}

      
    }

  return (
    <div className="fixed inset-0 bg-red-800 bg-opacity-50 flex justify-center items-center z-30">
      <div className="dark:bg-gray-800 bg-white rounded-2xl p-8 w-full max-w-2xl relative top-72 shadow-lg overflow-hidden h-auto mt-4">
        <div
          className="flex w-[200%] transition-transform duration-500 ease-in-out"
          style={{
            transform: step === "correo" ? "translateX(0%)" : "translateX(-50%)",
          }}
        >
          
          <div className="w-full p-8">
            <div className="flex items-center justify-between border-b-2 border-[#003333] mb-6">
              <h1 className="text-[#003333] text-2xl font-bold  dark:text-white">
                ¿Has Olvidado tu clave de Acceso a JEVACOFFEE?
              </h1>
              <FontAwesomeIcon
                icon={faClose}
                onClick={onclose}
                className="text-xl cursor-pointer hover:text-red-500"
              />
            </div>

            <form onSubmit={sendEmail}>
              <p className="mb-6 text-lg">
                Si has olvidado tu contraseña de acceso, enviaremos un código de verificación al correo registrado.
              </p>
              <label className="block mb-2">
                Ingresa tu correo electrónico:
              </label>
              <input
                type="email"
                name="correo"
                value={data.correo}
                onChange={handleInputChange}
                className="w-full p-3 border-2 border-[#003333] rounded-xl focus:outline-none mb-6 dark:border-white"
                placeholder="Ingresa tu correo"
                required
              />
              <input
                type="submit"
                value="Enviar"
                className="mt-6 border-2 dark:border-white dark:text-[#003333] border-[#003333] w-full rounded-xl dark:bg-white  hover:bg-[#003333] hover:text-white p-4 cursor-pointer"
              />
            </form>
          </div>

          
          <div className="w-full p-8">
            <h2 className="text-[#003333] text-2xl font-bold mb-4 dark:text-white">Estas a Un paso de Recuperar tu cuenta</h2>
            <FontAwesomeIcon icon={faClose} onClick={onclose} className="size-7 cursor-pointer hover:text-red-500 mb-4 relative left-[94%] bottom-6" />
           <form onSubmit={verifyCode}>
                <div>
                       <p className="m-4">Ingresa tu correo.</p>
                          <input
                            type="email"
                            name="correo"
                            value={data.correo}
                            onChange={handleInputChange}
                            className="w-full p-3 border-2 border-[#003333] dark:border-white rounded-xl focus:outline-none"
                            placeholder="Código de verificación"
                          />
                </div>

                  <div>
                      <p className="m-4">Ingresa tu codigo de verificación.</p>
                          
                        <input
                          type="text"
                          name="codigo"
                          onChange={handleInputChange}
                          className="w-full p-3 border-2 border-[#003333] dark:border-white rounded-xl focus:outline-none"
                          placeholder="Código de verificación"
                        />

                  </div>
                  <div>
                    <p className="m-4 relative w-full">Ingresa tu Nueva Contraseña.</p>
                          <input
                            type={opensee ? "text":"password"}
                            name="clave"
                            onChange={handleInputChange}
                            className="w-full p-3 border-2 border-[#003333] rounded-xl focus:outline-none dark:border-white"
                            placeholder="Ingrese Nueva contraseña"
                          />
                          <button type="button"
                            className="absolute right-4 top-[70%] transform -translate-y-1/2"
                          onClick={() => setopen((prev)=> !prev)}>
                             <FontAwesomeIcon icon={opensee ? faEye : faEyeSlash} className="text-2xl text-default-400 flex-shrink-0 relative right-[70%] top-7 cursor-pointer" />
                          </button>
                  </div>
           </form>
            <button
              onClick={verifyCode}
              className="mt-6 border-2 dark:border-white dark:text-[#003333] border-[#003333] w-full rounded-xl dark:bg-white  hover:bg-[#003333] hover:text-white p-4 cursor-pointer"
            >
              Cambiar Contraseña
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
