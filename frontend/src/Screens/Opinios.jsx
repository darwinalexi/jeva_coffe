import NavBar from "../Components/NavBar"
import { useParams } from "react-router-dom"
import axiosClient from "../utils/axiosClient";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faWarning, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { baseurl } from "../utils/data";
import Swal from "sweetalert2";
import ImageUploadPreview from "../Components/Inpuimage";
import { Contact } from "../Components/Contact";

export const Opinions = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [datacomment, setDataComment] = useState([]);
  const [promedio, setPromedio] = useState(null);
  const [image, setImage] = useState("");
  const [type, setttype]= useState("")
  const [Cliente, setcliente]= useState("");
  const [datacoment, setComent] = useState({
    comentario: "",
    estrellas: "",
    foto:"",
    id_producto:id
  });

  const see_comment = async (id) => {
    const response = await axiosClient.get(`/listar_comentarios/${id}`);
    setDataComment(response.data);
  };

  const handleImageChange = (foto) => {
    setImage(foto);
    setComent({ ...datacoment, foto: foto });
  };
  useEffect(() => {
      const  datalocal= JSON.parse(localStorage.getItem('usuario')|| 'null');
        if (datalocal) {
            setttype(datalocal && datalocal.tipo ? datalocal.tipo : "");
          console.log("datacoompare", datalocal.identificacion?datalocal.identificacion: "")
        }
    see_comment(id);
    see_product();
    promedi();
    console.log("datacliient",Cliente)
  }, [id]);

  const create_comment = async (e) => {
    
    e.preventDefault();
    try {
      if (!datacoment.comentario || !datacoment.estrellas || !datacoment.id_producto) {
        Swal.fire({
            icon:'error',
            text:"Llene todos los campos que son obligatorios",
            buttonsStyling:"Ok"
        })
        return;
      }

        const newData= new FormData();
        const user= JSON.parse(localStorage.getItem('usuario') || 'null')
        const id_cliente= user.identificacion
        newData.append('comentario',datacoment.comentario);
        newData.append('estrellas',datacoment.estrellas);
        newData.append('imagen',datacoment.foto);
        newData.append('id_producto',datacoment.id_producto);
        newData.append('id_cliente', id_cliente)
        newData.forEach((value, key)=>{
                console.log(value, key)
        })

        console.log("comentario",typeof datacoment.comentario);
        console.log("estrellas",typeof datacoment.estrellas);
        console.log("foto",typeof datacoment.foto);
        console.log("id_producto",typeof datacoment.id_producto);
        console.log("id_cliente",typeof id_cliente)

      const response = await axiosClient.post("/crear_comentario", newData);
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          text: response.data.mensaje
        });
        window.location.reload();
      }
    } catch (e) {
      if (!e.response) {
          Swal.fire({ icon: 'error', text: 'No se pudo conectar con el servidor' });
          return;
        }
        const { status, data } = e.response;
        let mensaje = "Error inesperado";
        if (data?.errores) {
          mensaje = data.errores.map(err => err.msg).join(', ');
        } else if (data?.mensaje) {
          mensaje = data.mensaje;
        } else if (data?.msg) {
          mensaje = data.msg;
        }
        Swal.fire({
          icon: 'error',
          title: `Error ${status}`,
          text: mensaje,
        });
    }
  };

  const see_product = async () => {
    const response = await axiosClient.get(`/producto/${id}`);
    setData(response.data);
  };

  const promedi = async () => {
    const response = await axiosClient.get(`/promedio/${id}`);
    const value = response.data[0][0]?.promedio || 0;
    setPromedio(parseFloat(value));
  };

   



  const scroll = {
    scrollbarWidth: "none"
  };

  return (
    <div className="">
      <NavBar />
      <div className="sm:grid grid-cols-1 sm:gap-y-6 md:grid grid-cols-2  gap-x-12 pb-12 mt-20">
        <h1 className="col-span-2 flex justify-center font-poppins text-2xl m-2 font-black uppercase sm: ml-7">En Jeva Coffee tu opinión nos importa</h1>

        <div className="border-1 border-[#003333] m-6 w-[90%] rounded-2xl h-full bg-[#e0d8d6] dark:bg-gray-800">
          {data.map((item, index) => {
            let imagenes=[]
              try {
                if (item.imagen && item.imagen.trim().startsWith('[')) {
                  imagenes = JSON.parse(item.imagen);
                } else if (item.imagen) {
                  imagenes = [item.imagen]; 
                }
              } catch (error) { 
                console.log("error", error);
              }            
            return (
              <div key={index}>
              <div className="p-3 w-full h-[50%]">
                <img src={`${baseurl}/img/${imagenes[0]}`} className="w-[100%] h-[100%] rounded-lg" />
              </div>
              <div className="flex flex-col p-2">
                <p className="text-2xl m-4"><strong>Acerca del producto: </strong></p>
                <p className="text-xl m-2"><strong>Nombre:</strong> {item.nombre}</p>
                <p className="text-xl m-2"><strong>Precio:</strong> ${item.precio}</p>
                <p className="text-xl m-2"><strong>Descripción:</strong> {item.descripcion || "No Aplica"}</p>
              </div>
            </div>
            )

        })}
        </div>

        <div className="overflow-y-auto max-h-[600px]" style={scroll}>
          <h1 className="text-3xl flex justify-center">Comentarios del Producto</h1>

          {datacomment.length > 0 ? (
            <div className="p-2">
              <p className="text-lg font-semibold">Calificación Promedio del Producto:</p>
              {promedio !== null && (
                <div className="flex items-center gap-2 mb-4">
                  {renderstart(promedio)}
                  <span>({promedio.toFixed(1)}) / 5</span>
                </div>
              )}

              {datacomment.map((item, i) => (
                <div key={i} className="border-2  bg-gray-300 p-3 m-2 rounded-xl dark:bg-gray-800 grid grid-cols-2">
                 <p>Ciente: {item.nombre}</p>
                  
                  <div className="m-4 text-2xl flex items-center gap-2">
                     
                    <div className="flex sm: w-[45%]  sm: relative right-[16%]">
                    Calificación:  {renderstart(Number(item.estrellas))}
                    </div>
                  </div>

                  {item.foto ?(
                    <img src={`${baseurl}/img/${item.foto}`} className="rounded-full h-60 mt-9" />
                  ):(
                      <p className="flex justify-center">No Hay Imagen</p>
                  )}
                  <p className="text-medium m-6 col-span-2 max-w-full md:max-w-[600px] break-words ">{item.comentario}</p>
                </div>  
              ))}
            </div>
          ) : (
            <p className="flex justify-center text-red-600 text-2xl items-center">No hay comentarios todavía. Sé el primero en comentar.</p>
          )}
        </div>
      </div>

          {type.length>0 ? (
               <form onSubmit={create_comment} className=" h-auto p-2 w-[90%] ml-10">
            <h2 className="flex justify-center m-8">¡Anímate a dar tu opinión si ya lo has probado!</h2>
            <textarea
              className="border-2 p-4 border-[#003333] rounded-xl w-full h-[50%] m-2 focus:outline-none"
              placeholder="Deseas dar tu opinión de este producto"
              onChange={(e) => setComent({ ...datacoment, comentario: e.target.value })}
            ></textarea>

            <p className="font-semibold mt-2">Califica nuestro producto de 1 a 5 estrellas:</p>
            {[1, 2, 3, 4, 5].map((num) => (
              <label key={num} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="estrellas"
                  value={num}
                  checked={Number(datacoment.estrellas) === num}
                  onChange={() => setComent({ ...datacoment, estrellas: Number(num) })}
                />
                <span>{num} Estrella{num > 1 ? 's' : ''}</span>
              </label>
            ))}

            <ImageUploadPreview onImageChange={handleImageChange} />
            <div className="border-3 border-l-[#Ff6600] p-5  bg-gray-300  dark:bg-gray-800 m-6 w-[90%] md:ml-24 flex inline-block rounded-xl">
                    <FontAwesomeIcon icon={faWarning} className="text-[#Ff6600]"/>
                    <p className="dark:text-[#1BB3A1]"><strong className="text-red-500">Nota: </strong> La Imagen es opcional</p>
            </div>
            <input type="submit" value="Comentar" className="mt-4 p-2  w-[45%] dark:bg-[#5E2419] bg-[#003333] md:relative left-[30%] text-white rounded-xl cursor-pointer hover:bg-[#005555]" />
          </form>
          ):(
            <p className="uppercase flex justify-center text-2xl m-5">Si No estas En nuestrsa Comunidad Registrate y da tu Opinión de nuestros productos </p>
          )}
      
          <Contact/>
    </div>
  );
};

const renderstart = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const decimal = rating - fullStars;

  let totalFull = fullStars;
  let halfStar = false;

  if (decimal >= 0.75) {
    totalFull += 1; // cuenta como completa
  } else if (decimal >= 0.25) {
    halfStar = true; // cuenta como media
  }

  for (let i = 1; i <= 5; i++) {
    if (i <= totalFull) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          className="text-[#003333] dark:text-[#5E2419]"
        />
      );
    } else if (halfStar && i === totalFull + 1) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStarHalfStroke}
          className="text-[#003333] dark:text-[#5E2419]"
        />
      );
    } else {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          className="text-gray-400"
        />
      );
    }
  }

  return stars;
};

