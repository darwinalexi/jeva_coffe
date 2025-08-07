import  { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Main } from "../src/Screens/Main";
import { Store } from "../src/Screens/Store";
import { Politices_private } from "./Components/Politices_ans_private";
import PrivateRouter from "./Components/Routes/PrivaterRouter";
import { Profile } from "./Screens/Profile";
import { Client } from "./Screens/Client";
import { Buys_Client } from "./Screens/Buys_Client";
import { Opinions } from "./Screens/Opinios";
import { Sales } from "./Screens/Sales";

function AppContent() {
  const location = useLocation();
  const isProfile = location.pathname === "/perfil";
  const [type, settype]= useState("cool")
  useEffect(()=>{
    try {
        const datalocal= JSON.parse(localStorage.getItem('Clientes'));
    console.log("datos",datalocal)
    let tipo= datalocal.tipo
    settype(tipo) 
    if (datalocal && tipo) {
      console.log("user full")
    }else{
      console.log("paila")
    }
    } catch (error) {
        console.log("error", error)     
    }
    console.log("tipo",type)
  },[type]);
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      <Routes>
        <Route path="/" element={<Main />} />
        
        <Route element={<PrivateRouter />}>
          <Route path="/administrar_productos" element={<Store />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="/clientes" element={<Client />} />
          <Route path="/compras_cliente" element={<Buys_Client />} />
          <Route path="/ventas" element={<Sales />} />
        </Route>

        <Route path="/tienda" element={<Store />} />
        <Route path="/politicas_datos" element={<Politices_private />} />
        <Route path="/opiniones/:id" element={<Opinions />} />
      </Routes>

      {isProfile && type==="Clientes" && <div className="p-64 h-3/4"></div>}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
