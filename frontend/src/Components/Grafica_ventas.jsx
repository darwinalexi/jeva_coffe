import { useEffect, useState } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from 'recharts';
import axiosClient from '../utils/axiosClient';

// Función personalizada para resaltar el sector activo con salto de línea
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

  const nameParts = payload.name.split(' ');

  return (
    <g>
      {/* Texto dentro del centro */}
      <text x={cx} y={cy - 10} textAnchor="middle" fontSize={14} fill="currentColor" className="text-[#333] dark:text-white">
        {nameParts[0]}
      </text>
      <text x={cx} y={cy + 10} textAnchor="middle" fontSize={14} fill="currentColor" className="text-[#333] dark:text-white">
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

      {/* Línea externa y texto */}
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />

      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey - 8} textAnchor={textAnchor} fill="currentColor" className="text-[#333] dark:text-white">
        {nameParts[0]}
      </text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey + 8} textAnchor={textAnchor} fill="currentColor" className="text-[#333] dark:text-white">
        {`${nameParts.slice(1).join(' ')}: ${value}`}
      </text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey + 26} textAnchor={textAnchor} fill="currentColor" className="text-[#999] dark:text-white">
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const GraficaVentas = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const show_client = async () => {
      try {
        const res = await axiosClient.get("/contar_ventas_entregadas");
        const res2 = await axiosClient.get("/contar_ventas_no_entregadas");

        const procesado = [
          { name: "Ventas Entregadas", value: res.data.Ventas_Entregadas },
          { name: "Ventas Por Entregar", value: res2.data.Ventas_No_Entregadas }
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
        <div style={{ height: 400 }} className="border border-[#003333] rounded-xl w-full mx-auto dark:border-white">
          <p className="flex justify-center text-2xl dark:text-white mb-2">Ventas</p>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                activeShape={renderActiveShape}
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index === 0 ? "#003333" : "#b91c1c"}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="flex justify-center items-center dark:text-white">No Hay Ventas en JEVACOFFE</p>
      )}
    </>
  );
};

export default GraficaVentas;
