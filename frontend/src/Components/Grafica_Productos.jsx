import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from 'recharts';
import axiosClient from '../utils/axiosClient';

// Función personalizada para resaltar el sector activo con salto de línea dentro y fuera
const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx, cy, midAngle, innerRadius, outerRadius,
    startAngle, endAngle, fill, payload, percent, value
  } = props;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  // Dividir el name para simular <br />
  const nameParts = payload.name.split(' ');

  return (
    <g>
      {/* Texto dentro del centro */}
      <text x={cx} y={cy - 10} textAnchor="middle" fill="currentColor" fontSize={14} className="text-[#333] dark:text-white">
        {nameParts[0]}
      </text>
      <text x={cx} y={cy + 10} textAnchor="middle" fill="currentColor" fontSize={14} className="text-[#333] dark:text-white">
        {nameParts.slice(1).join(' ')}
      </text>

      {/* Sectores */}
      <Sector {...{ cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill }} />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />

      {/* Línea externa y texto con salto de línea */}
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey - 8} textAnchor={textAnchor} fill="currentColor" fontSize={14} className="text-[#333] dark:text-white">
        {nameParts[0]}
      </text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey + 8} textAnchor={textAnchor} fill="currentColor" fontSize={14} className="text-[#333] dark:text-white">
        {`${nameParts.slice(1).join(' ')}: ${value}`}
      </text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey + 26} textAnchor={textAnchor} fill="currentColor" fontSize={14} className="text-[#999] dark:text-white">
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const GraficaProductos = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const show_client = async () => {
      try {
        const res = await axiosClient.get("/contar_productos_disponibles");
        const res2 = await axiosClient.get("/contar_productos_no_disponibles");

        const procesado = [
          { name: "Productos Disponibles", value: res.data.productos },
          { name: "Productos No Disponibles", value: res2.data.productos }
        ];
        setData(procesado);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    show_client();
  }, []);

  return (
    <>
      {data.length > 0 ? (
        <div style={{height: 400 }} className='border-1 border-[#3c2a21] dark:bg-gray-800  rounded-xl sm::w-screen md:w-[100%]'>
          <p  className='flex justify-center text-2xl'>Productos</p>        
          <ResponsiveContainer>
            <PieChart>
              <Pie
                activeShape={renderActiveShape}
                data={data}
                cx="46%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill="#3c2a21"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className='flex justify-center items-center'>No Hay Productos en JEVACOFFE</p>
      )}
    </>
  );
};

export default GraficaProductos;
