import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';
import axiosClient from '../utils/axiosClient';

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

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
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
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">
        {`Total ${value}`}
      </text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const GraficaCliente = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const show_client = async () => {
      try {
        const res = await axiosClient.get("/cliente");
        // Supongamos que quieres contar tipos de cliente o algo similar:
                console.log("cliente",res.data)

        const procesado = [
          { name: "No° de Clientes", value: res.data.Clientes }
        ];
        console.log(procesado)
        setData(procesado);
      } catch (error) {
        console.error("Error al obtener clientes:", error);
      }
    };

    show_client();
  }, []);

  return (
    <>
    {data.length>0?(
    <div style={{height:400 }} className='border-1 border-[#Ff6600] rounded-xl sm:w-screen md:w-full '>
      <h1 className='flex justify-center text-2xl '>No° de Clientes</h1>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#f97316"
            dataKey="value"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
    ):(
      <p className='flex justify-center item-center '>No Hay Clientes En JEVACOFFE</p>
    )}
    </>
  );
};

export default GraficaCliente;
