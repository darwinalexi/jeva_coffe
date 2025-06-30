 import bcryptjs from "bcryptjs";

export const encrypter = async (password) => {
  try {
    const hash = await bcryptjs.hash(password, 10);
    console.log("Resultado de encrypter:", hash); // ← línea importante
    return hash;
  } catch (err) {
    console.error("Error en encrypter:", err);
    return null;
  }
};


export const comparepassword = async (contrasena, clave_hash) => {
    try {
         const comparepasswords = await bcryptjs.compare(contrasena,clave_hash)
         return comparepasswords
        } catch (error) {
         console.error("Error al comparar contraseñas:", error);
    return false;
    }
}