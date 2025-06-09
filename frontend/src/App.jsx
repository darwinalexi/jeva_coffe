import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Main } from "../src/Screens/Main";
import { Store } from "../src/Screens/Store";
import { Politices_private } from "./Components/Politices_ans_private";
function App() {  
  return(
    <>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Main/>} /> 
          <Route path="/tienda" element={<Store/>} />
          <Route path="/politicas_datos" element={<Politices_private/>}/>
        </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
