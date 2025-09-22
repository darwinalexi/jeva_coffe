import Jwt from "jsonwebtoken"
import { connection } from "../database/conexion.js";
import { comparepassword, encrypter } from "./encripter.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
import bcrypt, { compare } from "bcryptjs";

export const login = async (req, res) => {
  try {
    const { correo, clave } = req.body;
    const [result] = await connection.query(
      "SELECT * FROM usuarios WHERE correo = ?",
      [correo]
    );


    if (result.length === 0 ) {
      return res.status(404).json({ mensaje: "Lo sentimos pero este correo no esta registrado" });
    }

    const user = result[0];
    
    
    if(user){
        const passwordValida = await comparepassword(clave, user.clave);
    if (!passwordValida) {
      return res.status(401).json({ mensaje: "Credenciales incorrectas" });
    }

    delete user.clave;

    const token = Jwt.sign(
      { id: user.identificacion },
      process.env.AUTO_SECRET,
      { expiresIn: process.env.AUTO_EXPIRE }
    );

    return res.status(200).json({
      usuario: user,
      token: token
    });
    }

  } catch (error) {
    console.log("Error login:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};




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


export const send_email = async (req, res) => {
  try {
    const { correo } = req.body;

    const [result] = await connection.query(
      "SELECT * FROM usuarios WHERE correo = ?",
      [correo]
    );

    if (result.length === 0 ) {
      return res.status(404).json({ mensaje: "Correo no registrado" });
    }

    const user= result[0] || sendclient[0];
    const code = crypto.randomBytes(3).toString("hex");

    const codigoHash = await bcrypt.hash(code, 10);

await connection.query(
      "UPDATE usuarios SET codigo_reset = ?, codigo_expira = DATE_ADD(NOW(), INTERVAL 10 MINUTE) WHERE correo = ?",
      [codigoHash, correo]
    );
      
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: "854a0d001@smtp-brevo.com",
        pass: process.env.API_KEY_BREVO,
      },
    });

    await transporter.sendMail({
      from: '"JEVACOFFE" <jevacoffeeofficial@gmail.com>',
      to: correo,
      subject: "Código para cambiar tu contraseña de la Cuenta en jeva Coffe",
      html: `
        <p style="text-black">Hola,${user.nombre}</p>
        <p style="text-black>"Has solicitado un codigo de verificación para cambiar tu clave en JEVACOFFE</p>
        <p style="text-black">Tu código de verificación es:</p>
        <h2 style="color: #003333;">${code}</h2>
        <p  style="text-black">Este código expira en 10 minutos.</p>
        <p style="text-black"><strong>Nota Importante:</strong> Si este Correo no es para ti, Por favor ignoralo.</p>
      `,
    });

    return res.status(200).json({ mensaje: "Código enviado al correo" });
    
  } catch (error) {
    console.error("Error en change_password:", error);
    return res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

export const change_password = async (req, res) => {
  try {
    const { correo, codigo, clave } = req.body;

    if(!correo ||!codigo || !clave) {
      return res.status(400).json({ mensaje: "Correo, Código y nueva contraseña son requeridos" });
    }

    const [see]= await connection.query("select*from usuarios where correo=?",[correo])
      if(see.length==0 ){
        return  res.status(404).json({ mensaje: "Usuario no encontrado" });
      }
    if(see.length>0){
      const users = see[0]
          if (!users.codigo_reset) {
          return res.status(400).json({ mensaje: "No se ha solicitado un cambio de contraseña" });  
        }

         const now= new Date(); 
        const expira= new Date(users.codigo_expira);
      if (now > expira) {
        return res.status(400).json({ mensaje: "El código de verificación ha expirado" });  
      }
        if (!users.codigo_reset) {
          return res.status(400).json({ mensaje: "Código de verificación requerido" });
        }

      const compara= await compare(codigo, users.codigo_reset);  
      
      if (!compara) {
        return res.status(400).json({ mensaje: "Código de verificación incorrecto" });
      }

      const clavehash= await encrypter(clave);
      const [passwiordsre] =await connection.query("UPDATE usuarios SET clave = ? WHERE correo = ?", [clavehash, correo]);

      if (passwiordsre ) {
        return res.status(200).json({ mensaje: "Contraseña cambiada con éxito" }); 
      } 

    }
   
  } catch (e) {
    console.error("Error en change_password:", e);
    return res.status(500).json({ mensaje: "Error interno del servidor" });
  }
}