import { connection } from "../database/conexion.js";
import multer from "multer";

const storage= multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, 'public/img');

    },
    filename:function(req, file, cb){
        console.log("nombre archivo", file.originalname)
        cb(null, file.originalname);
    }
})

const upload= multer({storage:storage});

export const SubirImg = (req, res, next) => {
    console.log("Procesando la imagen...");
    upload.single('imagen')(req, res, (err) => {
        if (err) {
            console.error("Error al cargar la imagen:", err);
            return res.status(500).json({ mensaje: "Error al procesar la imagen" });
        }
        next(); 
    });
}

export const see_comment=async(req, res)=>{
    try {
        const {id_producto}= req.params;
        const [comment]= await connection.query("select comentarios.comentario, usuarios.nombre, comentarios.estrellas, comentarios.foto, comentarios.id_producto from comentarios join usuarios on comentarios.id_cliente = usuarios.identificacion  where comentarios.id_producto=?",[id_producto]);
        if (comment.length>0) {
            res.status(200).json(comment);
        } else {
            res.status(404).json({
                "mensaje":"error"
            })            
        }
    } catch (e) {
        res.status(500).json({
            "mensaje":e
        })
    }
} 


export const promedi=async(req, res)=>{
    try {
        const {id_producto}= req.params;
        const estrella = await connection.query("select AVG(estrellas) as promedio from comentarios where id_producto=?",[id_producto])
        if (estrella.length>0) {
            res.status(200).json(estrella)
        } else {
            res.status(404).json({
                "mensaje":"No se Puede Obtener el promedio de calificacion"
            })
        }
    } catch (error) {
            res.status(500).json({
                "e":error
            })
    }
} 

export const create_comment = async (req, res) => {
  try {
    const { comentario, estrellas, id_producto, id_cliente } = req.body;
    let imagen = req.file?.filename;

    if (!comentario || !estrellas) {
      return res.status(400).json({
        mensaje: "Faltan datos: comentario, estrellas"
      });
    }

    const [create] = await connection.query(
      "INSERT INTO comentarios (comentario, estrellas, foto,id_producto,id_cliente) VALUES (?, ?, ?,?,?)",
      [comentario, estrellas, imagen,id_producto,id_cliente]
    );

    if (create.affectedRows > 0) {
      res.status(200).json({
        mensaje: "Comentario creado correctamente"
      });
    } else {
      res.status(500).json({
        mensaje: "Error al crear el comentario"
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      mensaje: error.message || "Error interno del servidor"
    });
  }
};
