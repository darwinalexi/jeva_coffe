import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import{ useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeskpro, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faIdCard, faPhone, faWarning, faEye, faEyeSlash  } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import axiosClient from "../utils/axiosClient";
import { loginWithGoogle } from "./SignGoogle";

export const RegisterClient = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [data, setData] = useState({
    identificacion: '',
    nombre: '',
    correo: '',
    celular: '',
    edad: '',
    clave: '',
    tipo:'Cliente',
    descripcion:''
  });

  const [showPassword, setShowPassword] = useState(false);  

  const seepassword=()=>{
    setShowPassword(true);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
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

  const register_client = async (e) => {
    if (!data.identificacion || !data.nombre || !data.correo || !data.correo || !data.celular || !data.edad || !data.clave || !data.tipo ) {
      
      Swal.fire({
        icon:'warning',
        title:'Advertencia',
        text:'Hay Campos que no se han completado a un y que se requirern para tu registro',        
      });

    return;
    }else if (data.edad < 18) {
      
      Swal.fire({
        icon:'warning',
        title:'Advertencia',
        text:'No Puedes Ser Registrado En Nuestra Tienda Por Que No Cumples Con La Edad'
      })
      
      return;
    }
    e.preventDefault();
    try {
      const register = await axiosClient.post("/usuarios", data);
      if (register.status === 200) {
        Swal.fire({
          icon: 'success',
          text: register.data.mensaje
        })
        
      } else {
        Swal.fire({
          icon: 'error',
          text: "Algo pasó"
        });
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

  return (
    <>
      <Button
        className="border-1 border-red-800 hover:bg-red-800 dark:border-[#ff6600] bg-transparent dark:hover:bg-[#ff6600] text-white"
        onPress={onOpen}
      >
        Registrate en Nuestra Plataforma
      </Button>
      <Modal
        isOpen={isOpen}
        placement="top-center"
        onOpenChange={onOpenChange}
        className="w-full"
      >
        <ModalContent
          style={{ width: "80%", maxWidth: "900px" }}
          className="max-h-[90vh] overflow-auto"
        >
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Regístrate</ModalHeader>
              <ModalBody>
              <form className="grid grid-cols-1 sm:grid-cols-2 gap-6" onSubmit={register_client}>
                <Input
                  endContent={<FontAwesomeIcon icon={faIdCard} className="text-2xl text-default-400" />}
                  label="Identificación"
                  type="number"
                  name="identificacion"
                  placeholder="Ingrese identificación"
                  
                  onChange={handleInputChange}
                  classNames={{ inputWrapper: "border-red-700" }}
                />
                <Input
                  label="Nombre"
                  name="nombre"
                  placeholder="Ingrese su nombre"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (onlinetext(value)) {
                      handleInputChange(e); 
                    }
                  }}
                  classNames={{ inputWrapper: "border-red-700" }}
                />
                <Input
                  endContent={<FontAwesomeIcon icon={faEnvelope} className="text-2xl text-default-400" />}
                  label="Correo"
                  name="correo"
                  type="email"
                  placeholder="Ingrese su correo"
                  onChange={handleInputChange}
                  classNames={{ inputWrapper: "border-red-700" }}
                />
                <Input
                  endContent={<FontAwesomeIcon icon={faPhone} className="text-2xl text-default-400" />}
                  label="Celular"
                  name="celular"
                  placeholder="Ingrese su celular"
                  type="number"
                  onChange={handleInputChange}
                  classNames={{ inputWrapper: "border-red-700" }}
                />
                <Input
                  endContent={<FontAwesomeIcon icon={faDeskpro} className="text-2xl text-default-400" />}
                  label="Descripcion"
                  name="descripcion"
                  onChange={(e) => {
                  const value = e.target.value;
                    if (onlinetext(value)) {
                      handleInputChange(e); 
                    }
                  }}
                  placeholder="(Opcional) Ingrese su descripcion"
                  type="text"
                  classNames={{ inputWrapper: "border-red-700" }}
                />

                    <Input
                      endContent={  <button
                        type="button"
                        onClick={() => setShowPassword((prev)=> !prev)}
                        className="focus: outline-none text-gay-300"
                      >
                        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash}  className="text-gray-400"/>
                      </button>}
                      label="Clave"
                      name="clave"
                      placeholder="Ingrese su clave"
                      type={showPassword ? 'text' : 'password'}
                      onChange={handleInputChange}
                      classNames={{ inputWrapper: "border-red-700" }}
                    />

                    <Input
                        label="Edad"
                        name="edad"
                        type="number"
                        placeholder="Ingrese su edad"
                        onChange={handleInputChange}
                        classNames={{ inputWrapper: "border-red-700" }}
                      />

  
  <div className="sm:col-span-2">
    <div className="flex items-center border-1 border-red-500 p-3 rounded-xl mb-2">
      <p className="p-1 text-red-500 text-sm">
        Debes tener la mayoría de edad para poderte registrar
      </p>
      <FontAwesomeIcon icon={faWarning} className="text-[#Ff6600] size-5 ml-2" />
    </div>
  </div>

  <Button
    className="border border-red-700 bg-white text-black hover:bg-red-700 hover:text-white sm:col-span-2"
    onClick={(e) => {
      e.preventDefault();
      loginWithGoogle();
    }}
  >
    <FontAwesomeIcon icon={faGoogle} className="mr-2" />
    Registrarse con Google
  </Button>

  <Button
    type="submit"
    className="border border-red-700 bg-white text-black hover:bg-red-700 hover:text-white sm:col-span-2"
  >
    Registrarse
  </Button>
</form>


              </ModalBody>
              <ModalFooter>
                <Button className="bg-red-700 text-white" variant="flat" onPress={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
