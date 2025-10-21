import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from 'recharts';
import axiosClient from '../utils/axiosClient';
import { useEffect, useState } from 'react';

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

  // dividir el nombre para salto de línea
  const nameParts = payload.nombre.split(' ');

  return (
    <g>
      {/* Texto dentro */}
      <text x={cx} y={cy - 10} textAnchor="middle" fill="currentColor" fontSize={14}>
        {nameParts[0]}
      </text>
      <text x={cx} y={cy + 10} textAnchor="middle" fill="currentColor" fontSize={14}>
        {nameParts.slice(1).join(' ')}
      </text>

      {/* Sector principal */}
      <Sector {...{ cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill }} />
      {/* Borde extra */}
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />

      {/* Línea y labels externos */}
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey - 8} textAnchor={textAnchor} fill="currentColor" fontSize={14}>
        {nameParts[0]}
      </text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey + 8} textAnchor={textAnchor} fill="currentColor" fontSize={14}>
        {`${nameParts.slice(1).join(' ')}: ${value}`}
      </text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey + 26} textAnchor={textAnchor} fill="currentColor" fontSize={14}>
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export const Grafica_de_unidadades_disponibles_de_cada_producto = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const showUnidades = async () => {
      try {
        const response = await axiosClient.get("/contar_unidades_por_producto");
        const datosTransformados = response.data.map(item => ({
          nombre: item.nombre,
          value: Number(item.total_disponibles)
        }));
        setData(datosTransformados);
      } catch (error) {z
        console.error("Error al obtener unidades:", error);
      }
    };

    showUnidades();
  }, []);

  const COLORS = ["#5E2419", "#003333", "#884EA0", "#2874A6", "#239B56"];

  return (
    <>
      {data.reduce((acc, item) => acc + item.value, 0) > 0 ? (
        <div style={{ height: 400 }} className="border rounded-xl w-full">
          <p className="flex justify-center text-2xl font-bold uppercase mb-2">
            Unidades disponibles por producto
          </p>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                activeShape={renderActiveShape}
                data={data}
                cx="46%"
                cy="50%"
                
                innerRadius={80}
                outerRadius={125} // delgado → borde de torta
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div style={{ height: 400 }} className="border rounded-xl flex items-center justify-center">
          <p className="uppercase">No hay datos disponibles</p>
        </div>
      )}
    </>
  );
};

