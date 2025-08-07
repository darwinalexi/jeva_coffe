import { connection } from "../database/conexion.js";
import { encrypter } from "./encripter.js"
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

export const register_user=async(req, res)=>{
    try {

       const {identificacion, nombre, correo,  clave, descripcion, tipo, edad}=req.body;
      
       let imagen = "profile_default.jpeg"; // Asignar imagen por defecto desde el principio

        if (req.file && req.file.filename) {
        imagen = req.file.filename;
        }


      const [check]= await connection.query("select* from usuarios where identificacion=? or correo=?",[identificacion, correo])      
      if (check.length>0) {
        res.status(404).json({
            "message":"No Se puede crear el usuario poorque la identificacion o correo ya estan en nuestra base de datos"
        })
      } else {
               const password= await encrypter(clave)     
         const [create]= await connection.query("insert into usuarios(identificacion, nombre, correo,clave,descripcion,tipo, imagen, edad)values(?,?,?,?,?,?,?,?)",[identificacion,nombre,correo,password,descripcion,tipo,imagen, edad])
         if (create.affectedRows>0) {
            res.status(200).json({
                "mensaje":"Se  Creo el usuario con exito"
            })
         } else {
             res.status(40).json({
                "mensaje":"Se  Creo el usuario con exito"
            })
         }
      }
  
    } catch (error) {
      console.log(error)
        res.status(500).json({
            message: "Error al crear usuario",
      })
    }

} 


export const update_user = async (req, res) => {
    try {
      const { identificacion } = req.params;
      let { nombre, correo, clave, descripcion, tipo, edad } = req.body;
  
      let imagen = req.file ? req.file.originalname : null;
  
      const [search] = await connection.query(
        "SELECT * FROM usuarios WHERE identificacion = ?",
        [identificacion]
      );
  
      if (search.length === 0) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
  
      const userToday = search[0];


      const getvalue = (newValue, oldValue) => {
            if (typeof newValue === 'undefined') return oldValue;
            if (newValue === null) return oldValue;
            if (newValue === "") return oldValue;
            return newValue;
        };
  
      const nombreFinal = getvalue(nombre, userToday.nombre)
      const correoFinal = correo || userToday.correo
      const imagenFinal = imagen || userToday.imagen
      const descripcionFinal = getvalue(descripcion, userToday.descripcion)
      const tipoFinal = getvalue(tipo, userToday.tipo)
      const edadFinal = getvalue(edad, userToday.edad)
      const claveFinal= getvalue(clave, userToday.clave)
  
      if (edadFinal <= 17 ) {
       return res.status(400).json({
          errores:[{msg:"Lo Sentimos pero si no tienes 18 años no puedes tener una cuenta en jeva y te aconsejamos informar a la persona encargada "}]
        })
      }
      const claveencrypter=await encrypter(claveFinal);
  
      const [update] = await connection.query(
        `UPDATE usuarios 
         SET nombre = ?, correo = ?, imagen = ?, clave = ?, descripcion = ?, edad = ?, tipo = ?
         WHERE identificacion = ?`,
        [
          nombreFinal,
          correoFinal,
          imagenFinal,
          claveencrypter,
          descripcionFinal,
          edadFinal,
          tipoFinal,
          identificacion,
        ]
      );
  
      if (update.affectedRows > 0) {
        return res.status(200).json({ message: "Usuario actualizado con éxito" });
      } else {
        return res.status(400).json({ message: "No se realizaron cambios en el usuario" });
      }
  
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      res.status(500).json({
        message: "Error interno al actualizar usuario",
      });
    }
  };
export const show_user= async(req, res)=>{
    try{
        const [searchuser]= await connection.query("select*from usuarios where tipo='Cliente'")
        if (searchuser.length>0) {
            res.status(200).json(searchuser)
        } else {
            res.status(404).json({
                "mensaje":" No Hay Clientes"
            })
        }
    }catch(error){
              res.status(500).json({
                "mensaje":error
            })
    }
}

export const delete_user= async(req, res)=>{
    try{
        const {identificacion}= req.params;
        const [deleteuser]= await connection.query("delete from usuarios where identificacion=?",[identificacion])
        if (deleteuser.affectedRows>0) {
            res.status(200).json({
                "mensaje":"se elimmino el usuario"
            })
        } else {
            res.status(404).json({
                "mensaje":" No se eimino el usuario"
            })
        }
    }catch(error){
              res.status(500).json({
                "mensaje":error
            })
    }
}

export const searcher_user=async(req, res)=>{
    try {
        const {identificacion}= req.params;
        const [show]= await connection.query("select*from usuarios where identificacion=?",[identificacion])
        if (show.length>0) {
            res.status(200).json(show)
        } else {
            res.status(404).json({
                "mensaje":"No se pudo encontrar este usuario"
            })
        }
    } catch (error) {
        console.log(error)
         res.status(500).json({
                "mensaje":error
            })
    }
}