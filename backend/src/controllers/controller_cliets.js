import { connection } from "../database/conexion.js";
import { encrypter } from "./encripter.js";
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("origen:public/img")
        cb(null, 'public/img');
    },
    filename: function (req, file, cb) {
        console.log("nombre archivo", file.originalname)
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

export const SubirImg = (req, res, next) => {
    console.log("Procesando la imagen...");
    upload.single('imagen')(req, res, (err) => {
        if (err) {
            console.error("Error al cargar la imagen:", err);
            return res.status(500).json({ mensaje: "Error al procesar la imagen" });
        }

        next(); 
    });
};
export const create_client=async(req, res)=>{
    try{
        const {identificacion, nombre, correo, celular, edad, clave}=req.body;
        
        let imagen = "profile_default.jpeg";

        const clavehash= await encrypter(clave);
        const [create]= await connection.query("insert into clientes (identificacion, nombre, correo, celular, edad, clave, imagen)values(?,?,?,?,?,?,?)",[identificacion, nombre, correo, celular, edad, clavehash, imagen]);
        if (create.affectedRows>0) {
            res.status(200).json({
                "mensaje":"se creo con exito"
            })
        } else {
            res.status(404).json({
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


export const see_client=async(req, res)=>{
    try {
        const {identificacion}=req.params;
    const [search]= await connection.query("select*from clientes where identificacion=?",[identificacion])
    if (search.length>0) {
        res.status(200).json(search)
    } else {
        res.status(404).json({
            "mensaje":"No se encontro el cliente"
        })
    }   
    } catch (error) {
        res.status(500).json({
            "mensaje":error
        })
    }
}