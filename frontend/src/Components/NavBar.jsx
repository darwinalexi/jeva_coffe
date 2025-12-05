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
import { useState, useEffect } from "react";
import Login from "./Login";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faStore, faBars, faBox, faUsers } from "@fortawesome/free-solid-svg-icons";
import axiosClient from "../utils/axiosClient";
import { baseurl } from "../utils/data";
import { RegisterUser } from "./FrmRegisterUser";
import { RegisterClient } from "./Create_client";
import { useTour } from "./Context/TourContext";
import { driver } from "driver.js";

export default function NavBar() {
  const [Aut, SetAuth] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [type_user, setType] = useState("");
  const { addStep, startTour } = useTour();

  const start = async () => {
  const hasCompleted = localStorage.getItem("hasCompletedTour");
  if (hasCompleted) return;

  let tries = 0;
  while (!document.querySelector("#menu") && tries < 10) {
    await new Promise((res) => setTimeout(res, 300));
    tries++;
  }

  const element = document.querySelector("#menu");
  if (!element) return;

  // Agregar paso
  addStep({
    element: "#menu",
    popover: {
      title: "Menú principal",
      description: "Aquí podrás navegar entre las secciones principales de Jeva Coffee.",
      side: "bottom",
      align: "center",
    },
  });

  // Esperar un poco para que React actualice el estado `steps`
  setTimeout(() => {
    startTour();
  }, 500);
};




  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    const datauser = JSON.parse(localStorage.getItem("usuario") || "{}");

    if (datauser) {
      const tipo = datauser.tipo || "";
      if (token) {
        SetAuth(true);
      } else {
        SetAuth(false);
      }
      setType(tipo);

      const id = datauser.identificacion;
      console.log("identificacion", id);
      fetchUser(id);
    }
  }, []);

  useEffect(() => {
    console.log("Aut:", Aut);
  }, [Aut]);

  const logut = () => {
    localStorage.clear();
    SetAuth(false);
    navigate("/");
    window.location.reload();
  };

  const fetchUser = async (identificacion) => {
    try {
      const response = await axiosClient.get(`/usuario/${identificacion}`);
      const data = Array.isArray(response.data) ? response.data[0] : response.data;
      setUser(data);
    } catch (e) {
      console.log("Error al cargar usuario:", e);
    }
  };



  return (
<div id="menu" onClick={start}>
  <Navbar className="bg-[#003333] dark:bg-[#5E2419] transition-colors duration-300 fixed">
    {!Aut && (
        <>
          <Button
            variant="light"
            className="sm:hidden"
            onPress={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon icon={faBars} className="text-lg text-red-700 dark:text-[#ff6600]" />
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
                Productos
              </Link>
            </NavbarItem>
            <NavbarItem isActive>
              <RegisterClient />
            </NavbarItem>
          </NavbarContent>
        </>
      )}

      {Aut === false && (
        <div className="md:mt-2 md:relative -left-20">
          <Login />
        </div>
      )}

      {Aut && type_user === "Administrador" && (
        <>
          <Button
            variant="light"
            className="sm:hidden"
            onPress={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon icon={faBars} className="text-lg text-[#ff6600]" />
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
                <FontAwesomeIcon icon={faBox} className="mr-2" />
                Mis productos
              </Link>
            </NavbarItem>
            <NavbarItem isActive>
              <Link to="/clientes" className="text-white hover:text-red-700 dark:hover:text-[#ff6600]">
                <FontAwesomeIcon icon={faUsers} className="mr-2" />
                Mis clientes
              </Link>
            </NavbarItem>
          </NavbarContent>
          <RegisterUser />
        </>
      )}

      {Aut && type_user === "Cliente" && (
        <>
          <Button
            variant="light"
            className="sm:hidden"
            onPress={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon icon={faBars} className="text-lg text-[#ff6600]" />
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

      {user && type_user === "Administrador" && (
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
            <DropdownMenu aria-label="Profile Actions" variant="flat" className="dark:bg-black">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Nombre: {user.nombre}</p>
                <p className="font-semibold">Correo: {user.correo}</p>
              </DropdownItem>
              <DropdownItem key="/perfil" as={Link} to="/perfil" className="text-custom-teal dark:text-white">
                Perfil
              </DropdownItem>
              <DropdownItem key="ventas" as={Link} to="/ventas" className="text-custom-teal dark:text-white">
                Ventas
              </DropdownItem>
              <DropdownItem key="logout" color="danger" className="text-custom-teal dark:text-white" onPress={logut}>
                Cerrar Sesión
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      )}

      {user && type_user === "Cliente" && (
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
            <DropdownMenu aria-label="Profile Actions" variant="flat" className="dark:bg-black">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Nombre: {user.nombre}</p>
                <p className="font-semibold">Correo: {user.correo}</p>
              </DropdownItem>
              <DropdownItem key="/perfil" as={Link} to="/perfil" className="text-custom-teal dark:text-white">
                Perfil
              </DropdownItem>
              <DropdownItem key="logout" color="danger" className="text-custom-teal dark:text-white" onPress={logut}>
                Cerrar Sesión
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      )}

      {menuOpen && Aut === false && (
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

      {menuOpen && type_user === "Administrador" && (
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

      {menuOpen && type_user === "Cliente" && (
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
    </Navbar>
  </div>
  );
}
