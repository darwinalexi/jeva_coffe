import {connection} from "../database/conexion.js"

export const create_sales = async (req, res) => {
  try {
    const {productos, fecha_venta,valorventa,departamento_id,municipio_id,direccion,nombre_cliente,apellidos_cliente,correo,region,ciudad,idpais,id_cliente, celular } = req.body;
    const estado = "Por Entregar"

    if (!Array.isArray(productos) || productos.length === 0) {
      return res.status(400).json({ mensaje: "Debe incluir al menos un producto" });
    }

    const result=[];
    for (const item of productos) {
      const { id_producto, unidades_compradas } = item;

      if (!id_producto || unidades_compradas <= 0) {
        return res.status(400).json({
          mensaje: "Cada producto debe tener un ID válido y unidades mayores a 0"
        });
      }

     const  [create] = await connection.query(
        `INSERT INTO ventas 
          (id_producto, fecha_venta, valor_venta, departamento, municipio, estado, direccion, numero_de_unidades_compradas, nombre, apellidos, correo, idpaises, region, ciudad, id_cliente, telefono) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)`,
        [id_producto,fecha_venta,valorventa,departamento_id || null,municipio_id || null,estado,direccion,unidades_compradas,nombre_cliente,apellidos_cliente,correo,idpais,region || null,ciudad || null,id_cliente || null, celular]);

      if (create.affectedRows > 0) {
      const [update]= await connection.query("update productos set unidades_disponibles= unidades_disponibles -? where id=? and unidades_disponibles >= ?",[unidades_compradas,id_producto, unidades_compradas])
      if(update.affectedRows >0){

        const [seearch]= await connection.query("select*from productos where id=?",[id_producto]);
        const unidades=seearch[0]
        const unidades_disponibles= unidades.unidades_disponibles;
        console.log("data unifafrs",unidades_disponibles);
        if (unidades_disponibles === 0) {
          const [updates]= await connection.query("update productos set estado='No Disponible' where id=?",[id_producto])
          if (updates.affectedRows > 0 && create.affectedRows > 0) {              
                result.push({
                  id_venta: create.insertId,
                  id_producto: id_producto,
                  unidades_compradas: unidades_compradas,
            
                });

          }

        }
      }
    }


  }

  return  res.status(200).json({
      mensaje: "Compra procesada",
      result
    });
}catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al registrar la compra",
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
      COALESCE(clientes.nombre, ventas.nombre) as nombre_cliente,
     productos.nombre as nombre_producto, 
     productos.imagen,
     ventas.apellidos,     
     COALESCE(ventas.ciudad, municipios.municipio) as municipio,
     COALESCE(ventas.region, departamentos.departamento) as departamento,
     ventas.fecha_venta,
     paises.nombre as nombre_pais,
     ventas.direccion,
     ventas.correo,
     ventas.telefono as celular,
     ventas.estado,
     ventas.numero_de_unidades_compradas,
     ventas.valor_venta 
     from ventas
   left  join municipios on ventas.municipio= municipios.id_municipio
   left join paises on ventas.idpaises= paises.id
    left join departamentos on ventas.departamento=departamentos.id_departamento
    left join clientes on ventas.id_cliente = clientes.identificacion 
    left join productos on ventas.id_producto= productos.id`)

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
     COALESCE(clientes.nombre, ventas.nombre) as nombre_cliente,
     ventas.apellidos,
     productos.nombre as nombre_producto, 
     productos.imagen,     
     COALESCE(ventas.ciudad, municipios.municipio) as municipio,
     COALESCE(ventas.region, departamentos.departamento) as departamento,
     ventas.fecha_venta,
     paises.nombre as nombre_pais,
     ventas.direccion,
     ventas.correo,
     ventas.telefono as celular,
     ventas.estado,
     ventas.numero_de_unidades_compradas,
     ventas.valor_venta 
     from ventas
     left join municipios on ventas.municipio= municipios.id_municipio
     left join paises on ventas.idpaises= paises.id
     left join departamentos on ventas.departamento=departamentos.id_departamento
     left join clientes on ventas.id_cliente = clientes.identificacion 
     left join productos on ventas.id_producto= productos.id where ventas.id_cliente=${id_cliente}`)
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

export const count_sales_client=async(req, res)=>{
  try {
    const {id_cliente}= req.params;
    const [count]= await connection.query("select count(*) as numero_ventas from ventas where id_cliente=?",[id_cliente]);
    if (count[0].numero_ventas) {
      res.status(200).json(count[0].numero_ventas);
    }else{
      res.status(404).json({
        "mensaje":"No se Encontraron ventas"
      })
    }
  } catch (error) {
    console.log("error ",error) 
  }
}