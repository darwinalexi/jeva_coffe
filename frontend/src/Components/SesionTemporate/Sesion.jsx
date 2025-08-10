import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {useUserIdTimer }from "../SesionTemporate/Userid"

export const Sesion = ({ children }) => {
  const navigate = useNavigate();

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

  useUserIdTimer(handleInactivity, 1 * 60 * 1000); 

  return children;
};

