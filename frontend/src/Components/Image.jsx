import { Image } from "@nextui-org/react";

export default function Imagen() {
  return (
    <div className="w-[95vw] mx-auto">
      <Image
        isBlurred
        alt="Venta de café"
        className="w-full h-full object-cover"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxvQc8_gfRrA-z_XceJjhVicmn1GEl_lqF3w&s"
      />
    </div>
  );
}
