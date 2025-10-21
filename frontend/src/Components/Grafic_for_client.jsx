import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import axiosClient from "../utils/axiosClient";

const generateColors = (count) => {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const variation = Math.floor(35 + Math.random() * 40);
    const hue = 170 + (i * 25) % 60;
    colors.push(`hsl(${hue}, 60%, ${variation}%)`);
  }
  return colors;
};

const Grafica_for_client = ({ id_cliente }) => {
  const [data, setData] = useState([]);
  const [colors, setColors] = useState([]);
  const [sales, setSales] = useState(0);
  const [chartKey, setChartKey] = useState(0); // 👈 Clave para forzar renderizado

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get(
          `/contar_ventas_por_cliente/${id_cliente}`
        );

        const datosTransformados = response.data.map((item) => ({
          name: String(item.producto ?? item.nombre ?? item.id_producto),
          value: parseInt(item.numero_de_unidades_compradas, 10) || 0,
        }));

        const totalVentas =
          response.data.length > 0 ? response.data[0].numero_ventas : 0;
        setSales(totalVentas);
        setData(datosTransformados);
        setColors(generateColors(datosTransformados.length));

        // 👇 Forzar renderizado cuando los datos cambien
        setTimeout(() => setChartKey((prev) => prev + 1), 100);
      } catch (error) {
        console.error("❌ Error al obtener datos:", error);
        setData([]);
      }
    };

    fetchData();
  }, [id_cliente]);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2">
      <div
        style={{
          width: "100%",
          height: 400,
          border: "1px solid #eee ",
          bordreradius: 8,
          padding: 8,
          background: "#fff dark:bg-black",
        }} className=""
      >
        <h2 style={{ textAlign: "center", marginBottom: 6 }} className="dark:bg-black">
          VENTAS POR PRODUCTO
        </h2>
        <div style={{ width: "100%", height: 340 }} className="dark:bg-black">
          {data.length > 0 ? (
            <ResponsiveContainer key={chartKey} width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  innerRadius="45%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(1)}%)`
                  }
                  isAnimationActive={false} // 👈 Desactiva animación inicial
                >
                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value} unidades`, name]} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-60 flex justify-center items-center text-gray-500">
              No hay datos
            </div>
          )}
        </div>
      </div>

      <div className="h-full font-semibold flex justify-center items-center text-2xl">
        {sales >0 ?(
          <p>Nº de Ventas: {sales}</p>
        ):(
         <p> No tenemos datos disponibles</p>
        )}
        
      </div>
    </div>
  );
};

export default Grafica_for_client;
