import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {useUserIdTimer }from "../SesionTemporate/Userid"
import { useEffect, useState } from 'react';

export const Sesion = ({ children }) => {
  const [data, setdata]= useState("");

  const navigate = useNavigate(); 

  useEffect(()=>{
    const dataaut= JSON.parse(localStorage.getItem('usuario'));
    if (dataaut) {
      setdata(dataaut);
    }
  },[])
  

        const handleInactivity = () => {
      
          localStorage.removeItem('token');
          localStorage.removeItem('usuario')

        Swal.fire({
          title: 'Sesión cerrada',
          text: 'Hemos cerrado su sesión debido a un lapso muy largo de inactividad dentro de nuestra aplicación.',
          icon: 'info',
          confirmButtonText: 'Aceptar',
        }).then(() => {
          navigate('/');
        });
      };
        useUserIdTimer(data ? handleInactivity : null, 1 * 60 * 1000);

    

  return children;
};

