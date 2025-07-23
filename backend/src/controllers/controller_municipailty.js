import { connection } from "../database/conexion.js";

export const select_municipality=async(req, res)=>{
    try {
        const {id_departamento}=req.params;
        const [select]= await connection.query("select*from municipios where departamento_id=?",[id_departamento])
        if (select.length>0) {
            res.status(200).json(select);
        } else {
            res.status(404).json({
                "mensaje":"No se encontraron municipios"
            });            
        }            
    } catch (error) {
         res.status(500).json({
                "mensaje":error
            });  
    }
}