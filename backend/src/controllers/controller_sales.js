import { connection } from "../database/conexion.js";

export const create_sales =  async(req, res)=>{
    try {
        const {id_producto, id_cliente, fecha_venta, valor_venta, departamento_id, municipio_id, direccion }=req.body;
        let estado= "Por Entregado";

        const [create]=await connection.query("insert into ventas (id_producto, id_cliente, fecha_venta, valor_venta, departamento_id, municipio_id, estado, direccion)values(?,?,?,?,?,?,?,?)",[id_producto,id_cliente,fecha_venta,valor_venta,departamento_id,municipio_id,estado, direccion])
    
        if (create.affectedRows>0) {
            res.status(200).json({
                "mensaje":"se Creo Con exito la Compra"
            })
        } else {
            res.status(404).json({
                "mensaje":"algo paso"
            })
        }
    } catch (error) {
        console.log(error)
          res.status(500).json({
                "mensaje":error
            })
    }
}

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