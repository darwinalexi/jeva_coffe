import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Swal from "sweetalert2";
import axiosClient from "../utils/axiosClient";

export const Change_password = ({ onclose }) => {
  const [data, setData] = useState({ 
    correo: "", 
    codigo: "" ,
    newPassword: ""
    });
  const [step, setStep] = useState("correo");

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
        setStep("codigo"); // Cambia a la vista de código
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
    // Aquí podrías hacer una petición para verificar el código
    console.log("Código ingresado:", data.codigo);
    // Aquí iría la lógica para verificar el código con el backend
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-30">
      <div className="bg-white rounded-2xl p-8 w-full max-w-2xl relative top-64 shadow-lg overflow-hidden h-auto">
        <div
          className="flex w-[200%] transition-transform duration-500 ease-in-out"
          style={{
            transform: step === "correo" ? "translateX(0%)" : "translateX(-50%)",
          }}
        >
          {/* Vista 1: formulario de correo */}
          <div className="w-full p-8">
            <div className="flex items-center justify-between border-b-2 border-[#003333] mb-6">
              <h1 className="text-[#003333] text-2xl font-bold">
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
                className="w-full p-3 border-2 border-[#003333] rounded-xl focus:outline-none mb-6"
                placeholder="Ingresa tu correo"
                required
              />
              <input
                type="submit"
                value="Enviar"
                className="border-2 border-[#003333] w-full rounded-xl hover:bg-[#003333] hover:text-white p-4 cursor-pointer"
              />
            </form>
          </div>

          
          <div className="w-full p-8">
            <h2 className="text-[#003333] text-2xl font-bold mb-4">Verificación de código</h2>
            <FontAwesomeIcon icon={faClose} onClick={onclose} className="text-xl cursor-pointer hover:text-red-500 mb-4" />
            <p className="mb-4">Ingresa el código que te enviamos por correo.</p>
            <input
              type="text"
              name="codigo"
              value={data.codigo}
              onChange={handleInputChange}
              className="w-full p-3 border-2 border-[#003333] rounded-xl focus:outline-none"
              placeholder="Código de verificación"
            />
            <button
              onClick={verifyCode}
              className="mt-6 border-2 border-[#003333] w-full rounded-xl hover:bg-[#003333] hover:text-white p-4 cursor-pointer"
            >
              Verificar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
