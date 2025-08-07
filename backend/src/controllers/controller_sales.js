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

export const see_sales= async(req, res)=>{
  try{
    const [see]= await connection.query(`select ventas.id,
    clientes.nombre as nombre_cliente, 
     productos.nombre as nombre_producto, 
     productos.imagen,
     departamentos.departamento,
     municipios.municipio,
     ventas.fecha_venta,
     ventas.direccion,
     ventas.estado,
     ventas.numero_de_unidades_compradas,
     ventas.valor_venta 
     from ventas
     join municipios on ventas.municipio_id= municipios.id_municipio
     join departamentos on ventas.departamento_id=departamentos.id_departamento
     join clientes on ventas.id_cliente = clientes.identificacion 
    join productos on ventas.id_producto= productos.id`)

    if (see.length>0) {
      res.status(200).json(see)
    } else {
      res.status(404).json({
        "mensaje":"No Hay Ventas"
      })
    }
  }catch(e){
      console.log("error ",e)
  }
}


export const see_buy_client=async(req, res)=>{
  try {
    const {id_cliente}= req.params;

    const  [see]= await connection.query(`select ventas.id,
    clientes.nombre as nombre_cliente, 
     productos.nombre as nombre_producto, 
     productos.imagen,
     departamentos.departamento,
     municipios.municipio,
     ventas.fecha_venta,
     ventas.direccion,
     ventas.estado,
     ventas.numero_de_unidades_compradas,
     ventas.valor_venta 
     from ventas
     join municipios on ventas.municipio_id= municipios.id_municipio
     join departamentos on ventas.departamento_id=departamentos.id_departamento
     join clientes on ventas.id_cliente = clientes.identificacion 
    join productos on ventas.id_producto= productos.id where ventas.id_cliente=${id_cliente}`)
    if (see.length>0) {
      res.status(200).json(see)
    } else {
      res.status(404).json({
        "mensaje":"No Existe compras del cliente"
      })
    }
  } catch (error) {
     res.status(500).json({
        "mensaje":error
      })
  }
}

export const update_sales=async(req, res)=>{
  try {
    const {id}= req.params;

    const  [see]= await connection.query(`update ventas set estado='Entregado' where id=${id}`)
    if (see.affectedRows>0) {
      res.status(200).json({
        "mensaje":"Se Entrego con eexito al Cliente, Felicicidades por este nuevo logro."
      })
    } else {
      res.status(404).json({
        "mensaje":"No Existe compras del cliente"
      })
    }
  } catch (error) {
     res.status(500).json({
        "mensaje":error
      })
  }
}