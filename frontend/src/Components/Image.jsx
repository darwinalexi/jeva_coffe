import { Image } from "@nextui-org/react";
import { baseurl } from "../utils/data";

export default function Imagen({name, className }) {
  return (
    <div className="w-[60%] mx-auto      absosulte h-[100%]">
       <Image
      isBlurred
      alt="foto de perfil"
      className="h-full w-full"
      src={`${baseurl}/img/${name}`}
    />
    </div>
  );
}
