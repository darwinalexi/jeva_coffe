import React, { useState } from "react";
import { Button } from "@nextui-org/react";

export default function ImageUploadPreview({onImageChange}) {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // Verifica si el archivo es una imagen
    if (!file.type.startsWith("image/")) {
      alert("Por favor, selecciona un archivo de imagen válido.");
      return;
    }
    // Muestra el archivo en la consola
    console.log("Archivo seleccionado:", file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      onImageChange(file); // Llama a la función para pasar la imagen al componente padre
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", maxWidth: "400px", margin: "auto" }}>
      <h3>Seleccione la imagen a cargar</h3>
      {/* Hidden input file */}
      <input
        style={{ display: "none" }}
        type="file"
        accept="image/*"
        id="image-upload"
        onChange={handleImageChange}
      />
      {/* Boton para cargar imagen */}
      <label htmlFor="image-upload">
        <Button shadow color="primary" auto as="span">
          Cargar Imagen
        </Button>
      </label>
      {/* previsualizacion de imagen */}
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Imagen seleccionada"
          style={{ maxWidth: "100%", maxHeight: 300, borderRadius: 12, boxShadow: "0 4px 15px rgba(0,0,0,0.2)" }}
        />
      )}
    </div>
  );
}
