import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useUserIdTimer } from "../SesionTemporate/Userid";
import { useCallback, useState, useEffect } from 'react';

export const Sesion = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleInactivity = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setToken(null);

    Swal.fire({
      title: 'Sesión cerrada',
      text: 'Hemos cerrado su sesión por un largo lapso de inactividad.',
      icon: 'info',
      confirmButtonText: 'Aceptar',
    }).then(() => {
      window.location.reload();
      navigate('/');
    });
  }, [navigate]);

  useUserIdTimer(token ? handleInactivity : () => {}, token ? 5 * 60 *1000 : null);

  useEffect(() => {
    const handleStorage = () => setToken(localStorage.getItem('token'));
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return children;
};
