import {
  Navbar,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button
} from "@nextui-org/react";
import React, { useState, useEffect} from "react";
import Login from "./Login";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faStore, faBars, faBox,  faUsers, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import axiosClient from "../utils/axiosClient";
import { baseurl } from "../utils/data";
import { RegisterUser } from "./FrmRegisterUser";
import { RegisterClient } from "./Create_client";

export default function NavBar() {
  const [Aut, SetAuth] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [type_user, setType] = useState("");

  const navigate = useNavigate();

useEffect(() => {
  const token = localStorage.getItem("token") || "";
  const datauser = JSON.parse(localStorage.getItem("usuario") || "{}");
  const datacliente = JSON.parse(localStorage.getItem("Cliente") || "{}");
  const tipo = datacliente.tipo || datauser.tipo || "";

  console.log("Tipo de cliente:", tipo);
  SetAuth(token);
  setType(tipo);

  if (datauser.identificacion && (tipo === "Administrador" || tipo === "Empresa_Envios")) {
    fetchUser(datauser.identificacion);
  } else if (datacliente.identificacion && tipo === "Clientes") {
    client();
  }
}, []);


  const logut = () => {
    localStorage.clear();
    SetAuth("");
    navigate("/");
    window.location.reload();
  };


  const fetchUser = async (identificacion) => {
  try {
    if (type_user==="Administrador") {
      const response = await axiosClient.get(`/usuario/${identificacion}`);
      const data = Array.isArray(response.data) ? response.data[0] : response.data;
      setUser(data);
    }else{
      const response = await axiosClient.get(`/usuario/${identificacion}`);
      const data = Array.isArray(response.data) ? response.data[0] : response.data;
      setUser(data);
    }
  } catch (e) {
    console.log("Error al cargar usuario:", e);
  }
};

  const client=async()=>{
    try {
      const user = JSON.parse(localStorage.getItem("Cliente"));
      const response = await axiosClient.get(`/ver_cliente/${user.identificacion}`);
      setUser(response.data[0]);
    } catch (error) {
      console.error("Error al cargar cliente:", error); 
    }
  }
  return (
    <Navbar className="bg-[#003333] dark:bg-[#5E2419] transition-colors duration-300 fixed">
  
      {!Aut && (
        <>
        <Button
              variant="light"
              className="sm:hidden"
              onPress={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <FontAwesomeIcon icon={faBars} className="text-lg text-red-700" />
            </Button>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
              <NavbarItem>
                <Link to="/" className="text-white hover:text-red-700 dark:hover:text-[#ff6600]">
                  <FontAwesomeIcon icon={faHome} className="mr-2" />
                  Inicio
                </Link>
              </NavbarItem>
              <NavbarItem isActive>
                <Link to="/tienda" className="text-white hover:text-red-700 dark:hover:text-[#ff6600]">
                  <FontAwesomeIcon icon={faStore} className="mr-2" />
                  productos
                </Link>
              </NavbarItem>


               <NavbarItem isActive>
                <RegisterClient/>
              </NavbarItem>
            
            </NavbarContent>
          </>
      )}

      {Aut.length === 0 && (
        <div className="md:mt-2 md:relative -left-20">
          <Login />
        </div>
      )}

      {Aut.length > 0 && type_user === "Administrador" && (
       <>

      <Button
        variant="light"
        className="sm:hidden"
        onPress={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <FontAwesomeIcon icon={faBars} className="text-lg text-red-700" />
      </Button>

       <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link to="/" class="text-white hover:text-red-700 dark:hover:text-[#ff6600]">
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Inicio
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link to="/tienda" className="text-white hover:text-red-700 dark:hover:text-[#ff6600]">
            <FontAwesomeIcon icon={faBox} className="mr-2" />
            Mis  productos
          </Link>
        </NavbarItem>
         <NavbarItem isActive>
          <Link to="/clientes" className="text-white hover:text-red-700 dark:hover:text-[#ff6600]">
            <FontAwesomeIcon icon={faUsers} className="mr-2" />
            Mis  Clientes
          </Link>
        </NavbarItem>
      </NavbarContent>
       <RegisterUser />
       </>
        )}

        {(Aut.length>0 && type_user=="Empresa_Envios" &&(
          <>
             <Button
        variant="light"
        className="sm:hidden"
        onPress={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <FontAwesomeIcon icon={faBars} className="text-lg text-red-700" />
      </Button>

       <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link to="/" className="text-white hover:text-red-700 dark:hover:text-[#ff6600]">
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Inicio
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link to="/ventas" className="text-white hover:text-red-700 dark:hover:text-[#ff6600]">
            <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
            Ver Ventas
          </Link>
        </NavbarItem> 
      </NavbarContent>
          </>
        ))}



{Aut.length > 0 && type_user === "Clientes" && (
  <>
    <Button
      variant="light"
      className="sm:hidden"
      onPress={() => setMenuOpen(!menuOpen)}
      aria-label="Toggle menu"
    >
      <FontAwesomeIcon icon={faBars} className="text-lg text-red-700" />
    </Button>

    <NavbarContent className="hidden sm:flex gap-4" justify="center">
      <NavbarItem>
        <Link to="/" className="text-white hover:text-red-700 dark:hover:text-[#ff6600]">
          <FontAwesomeIcon icon={faHome} className="mr-2" />
          Inicio
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link to="/tienda" className="text-white hover:text-red-700 dark:hover:text-[#ff6600]">
          <FontAwesomeIcon icon={faStore} className="mr-2" />
          Comprar productos
        </Link>
      </NavbarItem>
    </NavbarContent>
  </>
)}


      {user && (
        <NavbarContent as="div" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="white"
                name={user.nombre}
                size="md"
                src={`${baseurl}/img/${user.imagen}`}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Nombre: {user.nombre}</p>
                <p className="font-semibold">Correo: {user.correo}</p>
              </DropdownItem>
              <DropdownItem key="/perfil" as={Link} to="/perfil" className="text-custom-teal dark:text-white">
                Perfil
              </DropdownItem>
              { type_user === "Administrador" && (
               <DropdownItem key="ventas" as={Link} to="/ventas" className="text-custom-teal dark:text-white">
                Ventas
               </DropdownItem>
              )}
              { type_user === "Empresa_Envios" && (
               <DropdownItem key="ventas" as={Link} to="/ventas" className="text-custom-teal dark:text-white">
                Ventas
              </DropdownItem>
              )}
              <DropdownItem key="logout" color="danger" className="text-custom-teal dark:text-white" onPress={logut}>
                Cerrar Sesión
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      )}

      {menuOpen && !Aut && (
        <div className="flex flex-col sm:hidden bg-[#003333] dark:bg-[#5E2419] absolute top-full left-0 w-full z-10 p-4 gap-4">
          <Link to="/" className="text-white hover:text-red-700  dark:hover:text-[#ff6600]" onClick={() => setMenuOpen(false)}>
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Inicio
          </Link>
          <Link to="/tienda" className="text-white hover:text-red-700 dark:hover:text-[#ff6600]" onClick={() => setMenuOpen(false)}>
            <FontAwesomeIcon icon={faStore} className="mr-2" />
            Tienda
          </Link>
        </div>
      )}


  {menuOpen && type_user=="Administrador" && (
        <div className="flex flex-col sm:hidden bg-[#003333] dark:bg-[#5E2419] absolute top-full left-0 w-full z-10 p-4 gap-4">
          <Link to="/" className="text-white hover:text-red-700 dark:hover:text-[#ff6600]" onClick={() => setMenuOpen(false)}>
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Inicio
          </Link>
          <Link to="/tienda" className="text-white hover:text-red-700 dark:hover:text-[#ff6600]" onClick={() => setMenuOpen(false)}>
            <FontAwesomeIcon icon={faBox} className="mr-2" />
            Mis Productos
          </Link>
          <Link to="/clientes" className="text-white hover:text-red-700 dark:hover:text-[#ff6600]" onClick={() => setMenuOpen(false)}>
            <FontAwesomeIcon icon={faUsers} className="mr-2" />
            Clientes
          </Link>
        </div>
      )}

      {menuOpen && type_user=="Clientes" && (
        <div className="flex flex-col sm:hidden bg-[#003333] dark:bg-[#5E2419] absolute top-full left-0 w-full z-10 p-4 gap-4">
          <Link to="/" className="text-white hover:text-red-700" onClick={() => setMenuOpen(false)}>
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Inicio
          </Link>
          <Link to="/tienda" className="text-white hover:text-red-700" onClick={() => setMenuOpen(false)}>
            <FontAwesomeIcon icon={faBox} className="mr-2" />
            Productos
          </Link>
        </div>
      )}

    {menuOpen && type_user === "Empresa_Envios" && (
      <div className="flex flex-col sm:hidden bg-[#003333] dark:bg-[#5E2419] absolute top-full left-0 w-full z-10 p-4 gap-4">
        <Link to="/" className="text-white hover:text-red-700 dark:hover:text-[#ff6600]" onClick={() => setMenuOpen(false)}>
          <FontAwesomeIcon icon={faHome} className="mr-2" />
          Inicio
        </Link>
        <Link to="/ventas" className="text-white hover:text-red-700 dark:hover:text-[#ff6600]" onClick={() => setMenuOpen(false)}>
          <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
          Ver Ventas
        </Link>
        
      </div>
    )}

    </Navbar>
  );
}
