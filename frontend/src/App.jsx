import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { Main } from "../src/Screens/Main";
import { Store } from "../src/Screens/Store";
import { Politices_private } from "./Components/Politices_ans_private";
import PrivateRouter from "./Components/Routes/PrivaterRouter";
import { Profile } from "./Screens/Profile";
import { Client } from "./Screens/Client";
import { Buys_Client } from "./Screens/Buys_Client";
import { Opinions } from "./Screens/Opinios";
import { Sales } from "./Screens/Sales";
import {Sesion }from "./Components/SesionTemporate/Sesion";
import { DetailSales } from "./Screens/DetailSales";

function AppContent() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <Routes>

        <Route element={<PrivateRouter />}>
          <Route path="/administrar_productos" element={<Sesion><Store /></Sesion>} />
          <Route path="/perfil" element={<Sesion><Profile /></Sesion>} />
          <Route path="/clientes" element={<Sesion><Client /></Sesion>} />
          <Route path="/compras_cliente" element={<Sesion><Buys_Client /></Sesion>} />
          <Route path="/ventas" element={<Sesion><Sales /></Sesion>} />
         <Route path="/ventas/:id" element={<Sesion><DetailSales/></Sesion>}/> 
        </Route>

        <Route path="/" element={<Sesion><Main/></Sesion>} />
        <Route path="/tienda" element={<Sesion><Store /></Sesion>} />
        <Route path="/politicas_datos" element={<Sesion><Politices_private /></Sesion>} />
        <Route path="/opiniones/:id" element={<Sesion><Opinions /></Sesion>} />
      </Routes>
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