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
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faIdCard, faPhone, faWarning } from "@fortawesome/free-solid-svg-icons";
import axiosClient from "../../../../sistema_de_registro/frontendWeb/src/utils/axiosClient";
import Swal from "sweetalert2";

export const RegisterClient = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [data, setData] = useState({
    identificacion: '',
    nombre: '',
    correo: '',
    celular: '',
    edad: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const register_client = async (e) => {
    e.preventDefault();
    try {
      const register = await axiosClient.post("/cliente", data);
      if (register.status === 200) {
        Swal.fire({
          icon: 'success',
          text: register.data.mensaje
        });
        window.location.reload();
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
        className="border border-red-700 bg-transparent hover:bg-red-700 text-white"
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
                    value={data.identificacion}
                    onChange={handleInputChange}
                    classNames={{ inputWrapper: "border-red-700" }}
                  />
                  <Input
                    label="Nombre"
                    name="nombre"
                    placeholder="Ingrese su nombre"
                    value={data.nombre}
                    onChange={handleInputChange}
                    classNames={{ inputWrapper: "border-red-700" }}
                  />
                  <Input
                    endContent={<FontAwesomeIcon icon={faEnvelope} className="text-2xl text-default-400" />}
                    label="Correo"
                    name="correo"
                    type="email"
                    placeholder="Ingrese su correo"
                    value={data.correo}
                    onChange={handleInputChange}
                    classNames={{ inputWrapper: "border-red-700" }}
                  />
                  <Input
                    endContent={<FontAwesomeIcon icon={faPhone} className="text-2xl text-default-400" />}
                    label="Celular"
                    name="celular"
                    placeholder="Ingrese su celular"
                    type="number"
                    value={data.celular}
                    onChange={handleInputChange}
                    classNames={{ inputWrapper: "border-red-700" }}
                  />
              <div>
             <div className="flex inline-block border-1 border-red-500 items-center p-3 rounded-xl">
               <p className="p-1  text-red-500" style={{fontSize:"12px"}}>Debes tener la Mayoria de edad para poderte registrar</p>
              <FontAwesomeIcon icon={faWarning} className="text-orange-400  size-5"/>
             </div>

                  <Input
                    label="Edad"
                    name="edad"
                    type="number"
                    placeholder="Ingrese su edad"
                    value={data.edad}
                    onChange={handleInputChange}
                    classNames={{ inputWrapper: "border-red-700" }}
                  />
              </div>
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
