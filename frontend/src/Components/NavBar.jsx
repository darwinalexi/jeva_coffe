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
} from "@nextui-org/react"
import React, { useState } from "react";
import Login from "./Login";
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faStore, faBars } from "@fortawesome/free-solid-svg-icons";
import Img from "../assets/img/logo.jpg"
import { useEffect } from "react";

export default function NavBar() {
  const [Aut, SetAuth]= useState("")
 const [menuOpen, setMenuOpen] = useState(false);

useEffect(() => {
  const datalocal = localStorage.getItem("token") || "";
SetAuth(datalocal);

}, []);

    return (
    <Navbar className="bg-[#003333]">

        {Aut.length==0  && (
         <>
          <Login/>
          <img src={Img} alt="" className="hidden sm:block w-32 h-auto mt-[9%]" />
          </>
        )}
          <Button
            variant="light"
            className="sm:hidden "
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon icon={faBars} className="text-lg text-red-700 hover: pointer" />
          </Button>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link  to="/" className="text-white hover:text-red-700">
           <FontAwesomeIcon icon={faHome} className="mr-2"/>
            Inicio
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link aria-current="page" className="text-white hover:text-red-700" to="/tienda">
           <FontAwesomeIcon icon={faStore} className="mr-2"/>
            Tienda 
          </Link>
        </NavbarItem>
      </NavbarContent>

 {Aut.length>0  && (
  <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
           <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="white"
              name="Jason Hughes"
              size="12px"
              src="./src/assets/img/logo.jpg"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
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
