import { connection } from "../database/conexion.js"
import crypto from "crypto";

export const create_sales = async (req, res) => {
  try {
    const {
      productos,
      fecha_venta,
      valorventa,
      departamento_id,
      municipio_id,
      direccion,
      nombre_cliente,
      apellidos_cliente,
      correo,
      id_cliente,
      celular
    } = req.body;

    const estado = "Por Entregar";

    if (!Array.isArray(productos) || productos.length === 0) {
      return res.status(400).json({ mensaje: "Debe incluir al menos un producto" });
    }

    const result = [];
    for (const item of productos) {
      const { id_producto, unidades_compradas } = item;

      if (!id_producto || unidades_compradas <= 0) {
        return res.status(400).json({
          mensaje: "Cada producto debe tener un ID válido y unidades mayores a 0",
        });
      }

      const [create] = await connection.query(
        `INSERT INTO ventas 
          (id_producto, fecha_venta, valor_venta, departamento, municipio, estado, direccion, numero_de_unidades_compradas, nombre, apellidos, correo, pais, id_clientes, telefono) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id_producto,
          fecha_venta,
          valorventa,
          departamento_id || null,
          municipio_id || null,
          estado,
          direccion,
          unidades_compradas,
          nombre_cliente,
          apellidos_cliente,
          correo,
          "Colombia",
          id_cliente || null,
          celular,
        ]
      );

      if (create.affectedRows > 0) {
        await connection.query(
          "UPDATE productos SET unidades_disponibles = unidades_disponibles - ? WHERE id = ? AND unidades_disponibles >= ?",
          [unidades_compradas, id_producto, unidades_compradas]
        );

        const [search] = await connection.query("SELECT * FROM productos WHERE id = ?", [id_producto]);
        if (search[0].unidades_disponibles === 0) {
          await connection.query("UPDATE productos SET estado='No Disponible' WHERE id=?", [id_producto]);
        }

        result.push({ id_venta: create.insertId, id_producto, unidades_compradas });
      }
    }

    // La referencia es opcional, si ya existe una la puedes usar
    const reference = `JEVA-${Math.floor(Math.random() * 1000000)}`;

    const valorNum = Number(valorventa.toString().replace(/\./g, "").replace(/,/g, ""));
    const amountInCents = Math.round(valorNum * 100);

    const currency = "COP";
    const secret = process.env.WOMPI_INTEGRITY_KEY; // Asegúrate de que esta variable de entorno esté configurada

    if (!secret) {
        throw new Error("La variable de entorno WOMPI_INTEGRITY_KEY no está definida.");
    }
    const cadenaFirmada = `${reference}${amountInCents}${currency}${secret}`;

    const signature = crypto.createHash("sha256").update(cadenaFirmada).digest("hex");

    console.log({
      reference,
      amountInCents,
      currency,
      secret,
      signature
    });

    return res.status(200).json({
      mensaje: "Venta registrada correctamente. Redirigiendo a la pasarela de pagos...",
      result,
      reference,
      amountInCents,
      currency,
      signatureIntegrity: signature
    });

  } catch (error) {
    console.error("❌ Error registrando compra:", error);
    res.status(500).json({
      mensaje: "Error al registrar la compra",
      error: error.message,
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
    COALESCE(usuarios.nombre, ventas.nombre) as nombre_cliente,
     productos.nombre as nombre_producto, 
     productos.imagen,
     ventas.apellidos,     
     municipios.municipio as municipio,
     departamentos.departamento as departamento,
     ventas.fecha_venta,
     ventas.pais,
     ventas.direccion,
     ventas.correo,
     ventas.telefono as celular,
     ventas.estado,
     ventas.numero_de_unidades_compradas,
     ventas.valor_venta 
     from ventas
   left  join municipios on ventas.municipio= municipios.id_municipio
    left join departamentos on ventas.departamento=departamentos.id_departamento
     left join usuarios on ventas.id_clientes= usuarios.identificacion
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

    const  [see]= await connection.query(`select
     usuarios.nombre as nombre_cliente,
     ventas.apellidos,
     productos.nombre as nombre_producto, 
     productos.imagen,     
     municipios.municipio as municipio,
     departamentos.departamento as departamento,
     ventas.fecha_venta,
     ventas.direccion,
     ventas.correo,
     ventas.id,
     ventas.id_clientes as id_cliente,
     ventas.telefono as celular,
     ventas.estado,
     ventas.numero_de_unidades_compradas,
     ventas.valor_venta 
     from ventas
     left join usuarios on ventas.id_clientes = usuarios.identificacion
     left join municipios on ventas.municipio= municipios.id_municipio
     left join departamentos on ventas.departamento=departamentos.id_departamento 
     left join productos on ventas.id_producto= productos.id where ventas.id_clientes=${id_cliente}`)
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
        "mensaje":"Se Entrego con exito al Cliente, Felicicidades por este nuevo logro."
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
    const [count]= await connection.query("select count(*) as ventas from ventas where id_clientes=?",[id_cliente])
    if (count.length>0) {
      res.status(200).json({
        "ventas":count[0].ventas
      })
    }else{
      res.status(404).json({
        "mensaje":"No hay ventas"
      })
    }
  } catch (error) {
    console.log("error ",error) 
  }
}


export const see_details=async(req, res)=>{
  try {
    const {id}= req.params;
    const [see]= await connection.query(`select usuarios.nombre as nombre_cliente, productos.nombre as nombre_producto, productos.imagen, ventas.apellidos, municipios.municipio as municipio, departamentos.departamento as departamento, ventas.fecha_venta, ventas.direccion, ventas.correo, ventas.telefono as celular, ventas.estado, ventas.numero_de_unidades_compradas, ventas.valor_venta from ventas left join municipios on ventas.municipio= municipios.id_municipio left join departamentos on ventas.departamento=departamentos.id_departamento left join usuarios on ventas.id_clientes= usuarios.identificacion left join productos on ventas.id_producto= productos.id where ventas.id=${id}`)

    if (see.length>0) {
      res.status(200).json(see)
    } else {
      res.status(404).json({
        "mensaje":"no hay info"
      })
    }
  } catch (error) {
    console.log("error", error)
  }
} 


export const count_sales_for_client= async(req, res)=>{
  try {

    const {id_cliente}= req.params;
    const [count]=  await connection.query(`select ventas.numero_de_unidades_compradas, usuarios.nombre ,productos.nombre as producto, ventas.valor_venta,ventas.id_producto as id_producto,(select count(*) as numero_ventas from ventas where ventas.id_clientes = ${id_cliente}) as numero_ventas from ventas
      join usuarios on ventas.id_clientes = usuarios.identificacion
      join productos on ventas.id_producto=productos.id 
      where ventas.id_clientes=${id_cliente}`);

    if (count.length>0 ) {
    res.status(200).json(count)
  } else {
    res.status(200).json([])
  }
} catch (error) {
    console.log("error", error)
    res.status(500).json({  
      "error":error
    })
  }
}
