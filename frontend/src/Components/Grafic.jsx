import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import axiosClient from '../utils/axiosClient';
import { useEffect, useState } from 'react';

export default function Grafica_ventas() {
  const [data, setData] = useState([]);

  const sales = async () => {
    try {
      const response = await axiosClient.get("/contar_ventas");
      const datosTransformados = response.data.map(item => ({
        mes: item.mes,
        numero_ventas: item.numero_ventas
      }));
      setData(datosTransformados);
      console.log("data",response.data)
    } catch (error) {
      console.error("Error al obtener las ventas:", error);
    }
  };

  useEffect(() => {
    sales();
  }, []);

  return (
    <div style={{ width: '100%', height: 350 }} className='m-4'>
      <h1 className="text-2xl flex justify-center">Estadisticas de Ventas de los Ultimos 4 Meses</h1>
      {data.length>0?(
        <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3"  />
          <XAxis dataKey="mes"/>
          <YAxis />
          <Tooltip 
  contentStyle={{ backgroundColor: "#f0f0f0", border: "1px solid #003333" }}
  itemStyle={{ color: "#003333" }}
  labelStyle={{ color: "#003333", fontSize: 14 }}
/>

          <Legend />
          <Bar dataKey="numero_ventas" fill="#003333" />
        </BarChart>
      </ResponsiveContainer>
      ):(
        <p className="flex justify-center text-2xl text-red-600">No hay datos disponibles para mostrar de las ventas de los ultimos 4 meses.</p>
      )}
    </div>
  );
}
