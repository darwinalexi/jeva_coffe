import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Main } from "../src/Screens/Main";
import { Store } from "../src/Screens/Store";
import { Politices_private } from "./Components/Politices_ans_private";
import PrivateRouter from "./Components/Routes/PrivaterRouter";
import { Profile } from "./Screens/Profile";
function App() {  
  return(
    <>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Main/>} /> 
          
           <Route element={<PrivateRouter />}>
              <Route path="/administrar_productos" element={<Store />} /> 
              <Route path="/perfil" element={<Profile/>}/>  
          </Route>

          <Route path="/tienda" element={<Store/>} />
          <Route path="/politicas_datos" element={<Politices_private/>}/>
        </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
