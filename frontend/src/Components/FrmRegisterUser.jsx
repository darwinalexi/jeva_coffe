import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import React from "react";
import { useState, useRef } from "react";
import ImageUploadPreview from "./Inpuimage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAudioDescription, faEnvelope, faIdCard, faLock, faUser} from "@fortawesome/free-solid-svg-icons";
import axiosClient from "../../../../sistema_de_registro/frontendWeb/src/utils/axiosClient";
import Swal from "sweetalert2";
export const MailIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M17 3.5H7C4 3.5 2 5 2 8.5V15.5C2 19 4 20.5 7 20.5H17C20 20.5 22 19 22 15.5V8.5C22 5 20 3.5 17 3.5ZM17.47 9.59L14.34 12.09C13.68 12.62 12.84 12.88 12 12.88C11.16 12.88 10.31 12.62 9.66 12.09L6.53 9.59C6.21 9.33 6.16 8.85 6.41 8.53C6.67 8.21 7.14 8.15 7.46 8.41L10.59 10.91C11.35 11.52 12.64 11.52 13.4 10.91L16.53 8.41C16.85 8.15 17.33 8.2 17.58 8.53C17.84 8.85 17.79 9.33 17.47 9.59Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const LockIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M12.0011 17.3498C12.9013 17.3498 13.6311 16.6201 13.6311 15.7198C13.6311 14.8196 12.9013 14.0898 12.0011 14.0898C11.1009 14.0898 10.3711 14.8196 10.3711 15.7198C10.3711 16.6201 11.1009 17.3498 12.0011 17.3498Z"
        fill="currentColor"
      />
      <path
        d="M18.28 9.53V8.28C18.28 5.58 17.63 2 12 2C6.37 2 5.72 5.58 5.72 8.28V9.53C2.92 9.88 2 11.3 2 14.79V16.65C2 20.75 3.25 22 7.35 22H16.65C20.75 22 22 20.75 22 16.65V14.79C22 11.3 21.08 9.88 18.28 9.53ZM12 18.74C10.33 18.74 8.98 17.38 8.98 15.72C8.98 14.05 10.34 12.7 12 12.7C13.66 12.7 15.02 14.06 15.02 15.72C15.02 17.39 13.67 18.74 12 18.74ZM7.35 9.44C7.27 9.44 7.2 9.44 7.12 9.44V8.28C7.12 5.35 7.95 3.4 12 3.4C16.05 3.4 16.88 5.35 16.88 8.28V9.45C16.8 9.45 16.73 9.45 16.65 9.45H7.35V9.44Z"
        fill="currentColor"
      />
    </svg>
  );
};


export const RegisterUser = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

const identificacionRef=useRef();  
const nombreRef= useRef();
const claveRef= useRef();
const correoRef= useRef();
const descripcionRef= useRef();
const edadRef= useRef();
const tipoRef= useRef();
const [image,setImage]= useState(null);
 const handleImageChange = (file) => {
    setImage(file);
  };

const register_user=async(e)=>{
    e.preventDefault();
        const formData= new FormData();

        formData.append('identificacion', identificacionRef.current.value);
        formData.append('nombre', nombreRef.current.value);
        formData.append('correo', correoRef.current.value);
        formData.append('clave', claveRef.current.value); 
        formData.append('descripcion',descripcionRef.current.value);
        formData.append('edad', edadRef.current.value);
        formData.append('tipo', tipoRef.current.value);
           
         if (image) {
        formData.append("imagen", image);
      }
            console.log("datos", formData)
            const register = await axiosClient.post("/usuarios", formData)
           if(register.status==200){
              Swal.fire({
                icon:'success',
                text:register.data.mensaje
              })
              window.location.reload();
           }else{
              Swal.fire({
                icon:'error',
                text:"Algo paso"
              })
           }
            console.log(register.data)
}

  return (
    <>
      <Button
        className="border-b border-b-red-700 border-t border-t-red-700 border-r border-r-red-700 border-l border-l-red-700 bg-transparent hover:bg-red-700 text-white"
        onPress={onOpen}
      >
        Registrar Usuario Nuevo
      </Button>
      <Modal
        isOpen={isOpen}
        placement="top-center"
        onOpenChange={onOpenChange}
        className="w-full"
      >
        {/*se  puede modificar el tamaño del modal */}
        <ModalContent
          style={{ width: "80%", maxWidth: "900px" }}
          className="max-h-[90vh] overflow-auto"
        >
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Registrate</ModalHeader>
              <ModalBody>
                <form className="grid grid-cols-1 sm:grid-cols-2 gap-6" onSubmit={register_user}>
                  <Input
                    endContent={
                      <FontAwesomeIcon icon={faIdCard} className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Identificación"
                    type="number"
                    ref={identificacionRef}
                    placeholder="Ingrese idfentificación"
                    name="Identificación"
                    classNames={{
                      inputWrapper: "border-red-700",
                    }}
                  />
                 <select classNames="border-1 border-red-700" ref={tipoRef} placeholder="Seleccione Un tipo  de Usuario">
                  <option value="hidden" disabled>Seleccione un tipo de Usuario</option>
                  <option value="Administrador">Administrador</option>
                  <option value="Empresa_Envios">Empresa de Envios</option>

                 </select>
                  <Input
                    endContent={
                      <FontAwesomeIcon icon={faUser} className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Nombre"
                    name="nombre"
                    ref={nombreRef}
                    type="text"
                    placeholder="Ingrese su nombre"
                    classNames={{
                      inputWrapper: "border-red-700",
                    }}
                  />

                   <Input
                    endContent={
                      <FontAwesomeIcon icon={faLock} className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Clave"
                    name="clave"
                    ref={claveRef}
                    placeholder="Ingrese su clave"
                    type="password"
                    classNames={{
                      inputWrapper: "border-red-700",
                    }}
                  />

                  
                  <Input
                   endContent={
                      <FontAwesomeIcon icon={faEnvelope} className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="correo"
                    ref={correoRef}
                    name="correo"
                    type="email"
                    placeholder="Ingrese su correo"
                    classNames={{
                      inputWrapper: "border-red-700",
                    }}
                  />
                  <Input
                    endContent={
                      <FontAwesomeIcon icon={faAudioDescription} className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="descripcion"
                    name="descripcion"
                    ref={descripcionRef}
                    placeholder="Ingrese su descripcion (Opcional)"
                    classNames={{
                      inputWrapper: "border-red-700",
                    }}
                  />
                  <Input
                    endContent={
                      <FontAwesomeIcon icon={faUser} className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Edad"
                    ref={edadRef}
                    name="Edad"
                    placeholder="Ingrese su Edad"
                    classNames={{
                      inputWrapper: "border-red-700",
                    }}
                  />

                  <div className="sm:col-span-2">
                    <ImageUploadPreview  onImageChange={handleImageChange}/>
                  </div>
                 <Button  className="border-1 border-custom-teal hover:bg-custom-teal bg-white hover:text-white text-black"  type="submit">
                  Registrar
                </Button>
              </form>
           
              </ModalBody>
              <ModalFooter>
                <Button className="bg-custom-teal text-white" variant="flat" onPress={onClose}>
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

