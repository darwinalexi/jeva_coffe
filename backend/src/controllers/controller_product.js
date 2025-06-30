import { connection } from "../database/conexion.js"
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



export const show_productos_avalible= async(req, res)=>{
    try {

        const [show] = await connection.query("select*from productos where estado ='Disponible'")
        if (show.length>0) {
            res.status(200).json(show)
        } else {
            res.status(404).json({
                "mensaje":"No Hay Datos que mostrar"
            })
        }

    } catch (error) {
         res.status(500).json({
                "error":error
            })
    }

}

export const show_productos_notavalible= async(req, res)=>{
    try {

        const [show] = await connection.query("select*from productos where estado ='No Disponible'")
        if (show.length>0) {
            res.status(200).json(show)
        } else {
            res.status(404).json({
                "mensaje":"No Hay Datos que mostrar"
            })
        }

    } catch (error) {
         res.status(500).json({
                "error":error
            })
    }

}


export const create_productos=async(req, res)=>{
    try {
        const {id, nombre, unidades_disponibles,precio}= req.body;
        let imagen
        if (req.file) {
             imagen = req.file.originalname;
        }
        const [create] = await connection.query("insert into productos(id, nombre, unidades_disponibles, precio, imagen) values(?,?,?,?,?)",[id, nombre, unidades_disponibles, precio, imagen])
        if (create.affectedRows>0) {
            res.status(200).json({
                "mensaje":"El producto ya se creo con exito"
            })
        } else {
            res.status(404).json({
                "mensaje":"No se pudo crear el producto"
            })
        }

    } catch (error) {
         res.status(500).json({
                "error":error
            })
    }

}


export const update_productos=async(req, res)=>{
    try {
        const {id}= req.params;
        const {nombre, unidades_disponibles,precio}= req.body;
        let imagen
        if (req.file) {
             imagen = req.file.originalname;
        }
        const [create] = await connection.query("update productos set  nombre=?, unidades_disponibles=?, precio=?, imagen=?  where id=?",[nombre, unidades_disponibles, precio, imagen, id])
        if (create.affectedRows>0) {
            res.status(200).json({
                "mensaje":"El producto ya se actualizo con exito"
            })
        } else {
            res.status(404).json({
                "mensaje":"No se pudo actualizar el producto"
            })
        }

    } catch (error) {
         res.status(500).json({
                "error":error
            })
    }

}


export const delete_product= async(req, res)=>{
    try {
        const {id}= req.params
        const [delete_register]= await connection.query("delete from productos where id=?",[id])
        if (delete_register.affectedRows>0) {
            res.status(200).json({
                "mensaje":"Se elimino con exito el producto con id"+id
            })
        } else {
            res.status(404).json({
                "mensaje":"No se elimino con exito el producto con id"+id
            })
        }
    } catch (error) {
        res.status(500).json({
            "error":error
        })
    }
} 