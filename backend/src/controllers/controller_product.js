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
    upload.array('imagen',5)(req, res, (err) => {
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
        const {nombre, unidades_disponibles,precio, estado, usuario_id, descripcion}= req.body;
        let imagen=[]
        if (req.files   &&req.files.length>0) {
             imagen = req.files.map(file => file.originalname);
        }

        const imgsave=JSON.stringify(imagen);
        console.log("Imagen guardada:", imgsave);
        const [create] = await connection.query("insert into productos(nombre, unidades_disponibles, precio, imagen, estado, usuario_id, descripcion) values(?,?,?,?,?,?,?)",[nombre, unidades_disponibles, precio, imgsave, estado, usuario_id, descripcion])
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
        const {nombre, unidades_disponibles,precio, estado, descripcion}= req.body;
        let imagen
        if (req.file) {
             imagen = req.file.originalname;
        }

        const [searcher]= await connection.query("select*from productos where id=?",[id]);
        const productexit=searcher[0];

        const nuevonombre= nombre || productexit.nombre;
        const nuevasunidades= unidades_disponibles || productexit.unidades_disponibles;
        const nuevoprecio= precio || productexit.precio;
        const nuevaimg= imagen || productexit.imagen;
        const nuevoestado= estado || productexit.estado;
        const nuevadescripcion=descripcion || productexit.descripcion
        const [create] = await connection.query("update productos set  nombre=?, unidades_disponibles=?, precio=?, imagen=?, estado=?, descripcion=? where id=?",[nuevonombre, nuevasunidades, nuevoprecio, nuevaimg,nuevoestado, nuevadescripcion,id])
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


export const all_product=async(req, res)=>{
    try{
        const [all]= await connection.query("select*from productos");
        if(all.length>0){
        res.status(200).json(all)
        }else{
            res.status(400).json({
                "mensaje":"No hay nada"
            })
        }
    }catch(e){
        console.log(e)
    }
} 


export const count_product_avalible=async(req,res)=>{
    try {
        const [count]=await connection.query("select count(*) AS Numero_productos from productos where estado='Disponible'")
        if (count.length>0) {
            res.status(200).json({
                "productos":count[0].Numero_productos
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

export const count_product_no_avalible=async(req,res)=>{
    try {
        const [count]=await connection.query("select count(*) AS Numero_productos from productos where estado='No Disponible'")
        if (count.length>0) {
            res.status(200).json({
                "productos":count[0].Numero_productos
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

export const see_a_product=async(req, res)=>{
    try{
        const {id}= req.params;
        const [product]=await connection.query("select*from productos where id=?",[id]);
        if(product.length>0){
            res.status(200).json(product)
        }else{
            res.status(404).json({
                "mensaje":"No Hay Producto"
            })
        }
    }catch(e){
        res.status(500).json({
            "mensaje":e
        })
    }
}