import { connection } from "../database/conexion.js";

export const create_client=async(req, res)=>{
    try{
        const {identificacion, nombre, correo, celular, edad}=req.body;
        const [create]= await connection.query("insert into clientes (identificacion, nombre, correo, celular, edad )values(?,?,?,?,?)",[identificacion, nombre, correo, celular, edad]);
        if (create.affectedRows>0) {
            res.status(200).json({
                "mensaje":"se creo con exito"
            })
        } else {res.status(404).json({
            "mensaje":"No se Creo el usuario"
            })
        }
   }catch(e){
        res.status(500).json({
            "error":e
        })
    }
}


export const count_client=async(req,res)=>{
    try {
        const [count]=await connection.query("select count(*) AS Numero_Clientes from clientes")
        if (count.length>0) {
            res.status(200).json({
                "Clientes":count[0].Numero_Clientes
            })
        } else {
             res.status(404).json({
                "mensaje":"No hay nada"
            })
        }

    } catch (error) {
         res.status(500).json({
                "mensaje":error
            })
    }
} 

export const show_client=async(req,res)=>{
    try {
        const [show]=await connection.query("select * from clientes")
        if (show.length>0) {
            res.status(200).json(show)
        } else {
             res.status(404).json({
                "mensaje":"No hay nada"
            })
        }

    } catch (error) {
         res.status(500).json({
                "mensaje":error
            })
    }
} 

