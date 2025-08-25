import { auth, provider, signInWithPopup } from "../utils/firebase";
import Swal from "sweetalert2";
import axiosClient from "../utils/axiosClient";

export const loginWithGoogle = async () => {
  try {
    // Paso 1: Login con Google (solo para obtener datos)
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Paso 2: Pedir celular y edad al usuario
    const { value: formValues } = await Swal.fire({
      title: "Completa tu información",
      html:
        '<input i-input1" class="swal2-input" placeholder="Celular" class="w-full border-2 border-[#003333] rounded-lg px-3 py-2 mb-2">' +
        '<input id="swal-inpd="swal-input0" class="swal2-input" placeholder="Identificacion" class="w-full border-2 border-[#003333] rounded-lg px-3 py-2 mb-2">' +
        '<input id="swalut2" class="swal2-input" placeholder="Edad" type="number" class="w-full border-2 border-[#003333] rounded-lg px-3 py-2 mb-2">' +
        '<input id="swal-input3" class="swal2-input" placeholder="Ingres tu Clave" class="w-full border-2 border-[#003333] rounded-lg px-3 py-2 mb-2">',
      focusConfirm: false,
      preConfirm: () => {
        const identificacion = document.getElementById("swal-input0").value.trim();
        const celular = document.getElementById("swal-input1").value.trim();
        const edad = document.getElementById("swal-input2").value.trim();
        const claveingresada = document.getElementById("swal-input3").value.trim();
        if (!celular || !edad || !identificacion || !claveingresada) {
          Swal.showValidationMessage("Debes ingresar celular, edad, identificación y clave");
        }
        return { identificacion, celular, edad, claveingresada };
      },
    });

    // Si el usuario completó los campos
    if (formValues) {
      const clienteData = {
        identificacion: formValues.identificacion,
        nombre: user.displayName,
        correo: user.email,
        celular: formValues.celular,
        edad: formValues.edad,
        clave:formValues.claveingresada,
        tipo:"Clientes"
      };

      // Paso 3: Enviar al backend
      const res = await axiosClient.post("/cliente", clienteData);
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          text: "Registro exitoso con Google",
        });
        window.location.reload();
      }
    }

  } catch (e) {
if (e.response && e.response.status === 400) {
        const errores = e.response.data.errores;
        const mensajes = errores.map(err => err.msg).join(', ');
        Swal.fire({
          icon: 'error',
          text: `Error: ${mensajes}`,
        });
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Ocurrió un error al crear el cliente.',
        });
      }
  }
};
