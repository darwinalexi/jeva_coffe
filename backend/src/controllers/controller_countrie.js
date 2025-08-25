import { connection } from "../database/conexion.js";
export const count_count=async(req, res)=>{
    try {
        const [count] = await connection.query("SELECT * FROM paises");
        if (count.length > 0) {
            res.status(200).json(count);    
        } else {
            res.status(404).json({
                "mensaje": "No se encontraron paises"
            });
        }     
    } catch (error) {
        res.status(500).json({
            "mensaje": "Error al contar los paises",
            "error": error.message
        });
    }
}