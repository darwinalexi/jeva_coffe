import {connection} from "../database/conexion.js"

export const create_sales = async (req, res) => {
  try {
    const {
      productos, // Array de objetos con { id_producto, unidades_compradas }
      id_cliente,
      fecha_venta,
      valor_venta,
      departamento_id,
      municipio_id,
      direccion
    } = req.body;

    const estado = "Por Entregado";

    if (!Array.isArray(productos) || productos.length === 0) {
      return res.status(400).json({ mensaje: "Debe incluir al menos un producto" });
    }

    for (const item of productos) {
      const { id_producto, unidades_compradas } = item;

      if (!id_producto || unidades_compradas <= 0) {
        return res.status(400).json({
          mensaje: "Cada producto debe tener un ID válido y unidades mayores a 0"
        });
      }

      await connection.query(
        `INSERT INTO ventas 
          (id_producto, id_cliente, fecha_venta, valor_venta, departamento_id, municipio_id, estado, direccion, numero_de_unidades_compradas) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id_producto,
          id_cliente,
          fecha_venta,
          valor_venta,
          departamento_id,
          municipio_id,
          estado,
          direccion,
          unidades_compradas
        ]
      );
    }

    res.status(200).json({
      mensaje: "Se creó la(s) venta(s) con éxito",
      total_productos: productos.length
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al registrar la(s) venta(s)",
      error: error.message
    });
  }
};



export const count_sales=async(req,res)=>{
    try {
        const [count]= await connection.query("SELECT DATE_FORMAT(fecha_venta, '%Y-%m') AS mes, COUNT(*) AS numero_ventas FROM ventas WHERE fecha_venta >= DATE_SUB(CURDATE(), INTERVAL 4 MONTH) GROUP BY DATE_FORMAT(fecha_venta, '%Y-%m') ORDER BY mes DESC;");
        if(count.length>0){
            res.status(200).json(count);
        }else{
            res.status(404).json({
                "mensaje":"No se Encontraron ventas en los ultimos 4 meses"
            })
        }
    } catch (error) {
        res.status(500).json({
            "mensaje":error
        })
    }
}



export const count_sales_entregado = async(req, res)=>{
    try{
        const [count]=  await connection.query("select count(*) as numero_ventas from ventas where estado='Entregado' ")
         if(count.length>0){
            res.status(200).json({"Ventas_Entregadas":count[0].numero_ventas});
        }else{
            res.status(404).json({
                "mensaje":"No se Encontraron ventas entregadas a nuestros clientes"
            })
        }
  
  
    }catch(e){
        res.status(500).json({
            "mensaje":e
        })
    }
} 



export const count_sales_not_entregadas = async(req, res)=>{
    try{
        const [count]=  await connection.query("select count(*) as numero_ventas from ventas where estado='Por Entregar' ")
         if(count.length>0){
            res.status(200).json({"Ventas_No_Entregadas":count[0].numero_ventas});
        }else{
            res.status(404).json({
                "mensaje":"No se Encontraron ventas entregadas a nuestros clientes"
            })
        }
  
  
    }catch(e){
        res.status(500).json({
            "mensaje":e
        })
    }
} 