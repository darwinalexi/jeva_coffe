import { connection } from "../database/conexion.js"

export const select_departament= async(req, res)=>{
    try {
        const [select]= await connection.query("select*from departamentos")
        if (select.length>0) {
            res.status(200).json(select);
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