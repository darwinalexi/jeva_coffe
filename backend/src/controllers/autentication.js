import Jwt from "jsonwebtoken"
import { connection } from "../database/conexion.js";
import { comparepassword } from "./encripter.js";

export const login = async (req, res) => {
    try {
        
      const { correo, clave } = req.body;
      const [loginfull] = await connection.query("SELECT * FROM usuarios WHERE  correo = ?", [correo]);

        if (loginfull.length === 0) {
            return res.status(404).json({
                "mensaje": "Usuario No Encontrado"
            });
        }

        const user = loginfull[0];
        const passwordencrypter = await comparepassword(clave, user.clave);
    
        if (!passwordencrypter) {
            return res.status(404).json({
                "mensaje": "Credenciales incorrectas"
            });
        }

        const token = Jwt.sign({ id: user.identificacion }, process.env.AUTO_SECRET, { expiresIn: process.env.AUTO_EXPIRE });
        return res.status(200).json({
            "nombre": user.nombre,
            "correo": user.correo,
             "identificacion": user.identificacion,
            "tipo": user.tipo,
            "token": token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            "mensaje": error.message 
        });
    }
}



export const validarToken = async (req, res, next) => {
    try {
        const token = req.headers['token']
        if (!token) {
            return res.status(404).json({
                "mensaje": "El token es requerido"
            })
        } else {
            Jwt.verify(token,process.env.AUTO_SECRET, (error) => {
                if (error) {
                    return res.status(404).json({
                        "mensaje": "Token incorrecto"
                    })
                } else {
                    next()
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            "mensaje": error
        })
    }
}