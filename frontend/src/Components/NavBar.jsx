import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button
} from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import Login from "./Login";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faStore, faBars } from "@fortawesome/free-solid-svg-icons";
import Img from "../assets/img/logo.jpg";
import axiosClient from "../utils/axiosClient";
import { baseurl } from "../utils/data";
import { RegisterUser } from "./FrmRegisterUser";

export default function NavBar() {
  const [Aut, SetAuth] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setuser]= useState([])

  useEffect(() => {
    const datalocal = localStorage.getItem("token") || "";
    SetAuth(datalocal);
    users();
  }, []);

  const logut = () => {
    localStorage.clear(); 
    SetAuth(""); // Actualiza el estado de autenticación
   window.location.reload();
  };

  const users= async()=>{
      try{
        const identificacion = localStorage.getItem('identificacion');
        const response = await axiosClient.get(`/usuario/${identificacion}`);
        setuser(response.data)
      }catch(e){
          console.log(e)
      }
  }


  return (
    <Navbar className="bg-[#003333]">
      {Aut.length === 0 && (
        <>
        <div className="md:grid grid-cols-3 md:mt-24 gap-7 md:relative -left-20">
          <Login />
          <RegisterUser/>
          <img src={Img} alt="" className="hidden sm:block w-32 h-auto mt-[9%]" />
        </div>
          
        </>
      )}
      <Button
        variant="light"
        className="sm:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <FontAwesomeIcon icon={faBars} className="text-lg text-red-700 hover: pointer" />
      </Button>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link to="/" className="text-white hover:text-red-700">
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Inicio
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link aria-current="page" className="text-white hover:text-red-700" to="/tienda">
            <FontAwesomeIcon icon={faStore} className="mr-2" />
            Tienda 
          </Link>
        </NavbarItem>
      </NavbarContent>

      {Aut.length > 0 && (
        <NavbarContent as="div" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <div>
                
            {user .map((img=>(
              <Avatar
                key={img.identificacion}
                isBordered
                as="button"
                className="transition-transform"
                color="white"
                name="Jason Hughes"
                size="12px"
                src={`${baseurl}/img/${img.imagen}`}
              />
              )))}
              </div>
              
              
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                {user .map((data=>(
                 <>
                 <p className="font-semibold">Nombre: {data.nombre}</p>
                <p className="font-semibold">Correo:{data.correo}</p>
                </>
                )))}
                
              </DropdownItem>
              <DropdownItem key="perfil" as={Link} to="/perfil" className="text-custom-teal" >Perfil</DropdownItem>
              <DropdownItem key="team_settings" className="text-custom-teal" >Team Settings</DropdownItem>
              <DropdownItem key="analytics" className="text-custom-teal" >Analytics</DropdownItem>
              <DropdownItem key="system" className="text-custom-teal" > System</DropdownItem>
              <DropdownItem key="configurations" className="text-custom-teal" >Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback" className="text-custom-teal" >Help & Feedback</DropdownItem>
              <DropdownItem key="logout" color="danger" className="text-custom-teal" onClick={logut}>
                Cerrar Sesion
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
        
      )}

      {menuOpen && (
        <div className="flex flex-col sm:hidden bg-[#003333] absolute top-full left-0 w-full z-10 p-4 gap-4">
          <Link
            to="/"
            className="text-white hover:text-red-700"
            onClick={() => setMenuOpen(false)}
          >
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Inicio
          </Link>
          <Link
            to="/tienda"
            className="text-white hover:text-red-700"
            onClick={() => setMenuOpen(false)}
          >
            <FontAwesomeIcon icon={faStore} className="mr-2" />
            Tienda
          </Link>
        </div>
      )}
    </Navbar>
  );
}
