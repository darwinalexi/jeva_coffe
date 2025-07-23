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
import { faHome, faStore, faBars, faBox,  faUsers } from "@fortawesome/free-solid-svg-icons";
import Img from "../assets/img/logo.jpg";
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

    SetAuth(token);
    if (datauser.tipo) {
      setType(datauser.tipo);
    }

    if (datauser.identificacion) {
      fetchUser(datauser.identificacion);
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
      const response = await axiosClient.get(`/usuario/${identificacion}`);
      setUser(response.data[0]);
    } catch (e) {
      console.log("Error al cargar usuario:", e);
    }
  };

  return (
    <Navbar className="bg-[#003333]">
  
      {!Aut &&(
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
                <Link to="/" className="text-white hover:text-red-700">
                  <FontAwesomeIcon icon={faHome} className="mr-2" />
                  Inicio
                </Link>
              </NavbarItem>
              <NavbarItem isActive>
                <Link to="/tienda" className="text-white hover:text-red-700">
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
          <Link to="/" className="text-white hover:text-red-700">
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Inicio
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link to="/tienda" className="text-white hover:text-red-700">
            <FontAwesomeIcon icon={faBox} className="mr-2" />
            Mis  productos
          </Link>
        </NavbarItem>
         <NavbarItem isActive>
          <Link to="/clientes" className="text-white hover:text-red-700">
            <FontAwesomeIcon icon={faUsers} className="mr-2" />
            Mis  Clientes
          </Link>
        </NavbarItem>
      </NavbarContent>
       <RegisterUser />
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
              <DropdownItem key="/perfil" as={Link} to="/perfil" className="text-custom-teal">
                Perfil
              </DropdownItem>
              <DropdownItem key="ventas" as={Link} to="/perfil" className="text-custom-teal">
                Ventas
              </DropdownItem>
              <DropdownItem key="logout" color="danger" className="text-custom-teal" onPress={logut}>
                Cerrar Sesión
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      )}

    
      {menuOpen && !Aut && (
        <div className="flex flex-col sm:hidden bg-[#003333] absolute top-full left-0 w-full z-10 p-4 gap-4">
          <Link to="/" className="text-white hover:text-red-700" onClick={() => setMenuOpen(false)}>
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Inicio
          </Link>
          <Link to="/tienda" className="text-white hover:text-red-700" onClick={() => setMenuOpen(false)}>
            <FontAwesomeIcon icon={faStore} className="mr-2" />
            Tienda
          </Link>
        </div>
      )}


  {menuOpen && type_user=="Administrador" && (
        <div className="flex flex-col sm:hidden bg-[#003333] absolute top-full left-0 w-full z-10 p-4 gap-4">
          <Link to="/" className="text-white hover:text-red-700" onClick={() => setMenuOpen(false)}>
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Inicio
          </Link>
          <Link to="/tienda" className="text-white hover:text-red-700" onClick={() => setMenuOpen(false)}>
            <FontAwesomeIcon icon={faBox} className="mr-2" />
            Mis Productos
          </Link>
          <Link to="/tienda" className="text-white hover:text-red-700" onClick={() => setMenuOpen(false)}>
            <FontAwesomeIcon icon={faUsers} className="mr-2" />
            Clientes
          </Link>
        </div>
      )}
    </Navbar>
  );
}
