
import NavBar from "../Components/NavBar"
import SearchBar from "../Components/Searchar";
import axiosClient from "../utils/axiosClient";
import { useEffect, useState } from "react"; 
import DataTable from 'react-data-table-component';
import { Contact } from "../Components/Contact";
import {Link} from "react-router-dom"

function getCustomStyles(isDark) {
  return {
    rows: {
      style: {
        backgroundColor: isDark ? "#1a202c" : "white",
        color: isDark ? "#fff" : "#222",
        transition: "background 0.3s",
      },
      stripedStyle: {
        backgroundColor: isDark ? "#23272f" : "#f3f4f6",
      }
    },
    headCells: {
      style: {
        backgroundColor: "#003333",
        color: "white",
      },
    },
    cells: {
      style: {
        backgroundColor: isDark ? "#1a202c" : "white",
        color: isDark ? "#fff" : "#222",
      },
    },
    pagination: {
  style: {
    backgroundColor: isDark ? "#1a202c" : "white",
    color: isDark ? "#fff" : "#222",
  },
  pageButtonsStyle: {
    fill: isDark ? "#fff" : "#003333",
    backgroundColor: isDark ? "#23272f" : "#f3f4f6",
    color: isDark ? "#fff" : "#003333",
    '&:hover': {
      backgroundColor: isDark ? "#003333" : "#e0e0e0",
      color: "#fff",
    },
  },
}
  };
}

export const Client = () => {
  const [data, setdata] = useState([]);
  const [client, Setclient] = useState("");
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains("dark"));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const clients = async () => {
    const show = await axiosClient.get("/ver_cliente");
    setdata(show.data);
  };

  useEffect(() => {
    clients();
  }, []);

  const column = [
        {
            name:'Identiicacion',
            selector:row=>row.identificacion
        },

        {
            name:'Nombre',
            selector:row=>row.nombre
        },

        {
            name:'Edad',
            selector:row=>row.edad
        },

        
        {
            name:'correo',
            selector:row=>row.correo
        },
        
        {
            name:'Celular',
            selector:row=>row.celular
        },
        {
            name:'Accion',
            cell:row=>(
                <div>
                    <Link state={{ cliente: row }}  to="/compras_cliente" className="border-2 border-orange-500 rounded-lg p-2 hover:bg-orange-500 hover:text-white">
                        Ver Compras 
                    </Link>
                </div>
            )
        }

    ]
  const filterclient = data.filter(item => item.nombre.toLowerCase().includes(client.toLocaleLowerCase()));
  return (
    <>
      <NavBar />
      <h1 className="flex justify-center m-8 text-4xl font-black text-[#3c2a21] dark:text-white">Clientes</h1>
      <SearchBar
        value={client}
        onChange={(e) => Setclient(e.target.value)}
        placeholder="Buscar Clientes por nombre"
      />
      {filterclient.length > 0 ? (
        <div className="mt-9">
        <DataTable
          columns={column}
          customStyles={getCustomStyles(isDark)}
          data={filterclient}
          pagination
        />
        </div>
      ) : (
        <p className="text-4xl flex justify-center text-red-400 m-6">No Hay Clientes Registrados con el nombre {client}</p>
      )}
      <Contact />
    </>
  );
}