import { useState } from "react";
import { Buys } from "./ModalSales";

export const Carsmodal = ({ onClose, cartItems, setCartItems }) => {
  const [modalbuy, setBuy] = useState(false);
 const [databuy,setbuy]= useState([]);
  const total = cartItems.reduce((sum, item) => sum + item.precio * item.quantity, 0);

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  
  const modal_buy = () => {
  const productosFormateados = cartItems.map((item) => ({
    id_producto: item.id,
    nombre: item.nombre,
    unidades_compradas: item.quantity,
    valor_unitario: item.precio,
    subtotal: item.precio * item.quantity
  }));

  const valor_total_venta = productosFormateados.reduce(
    (acc, item) => acc + item.subtotal,
    0
  );

  const venta = {
    productos: productosFormateados,
    valor_total_venta,
    id_cliente: 1, 
    fecha_venta: new Date().toISOString().slice(0, 10),
    departamento_id: "",
    municipio_id: "",
    direccion: ""
  };

  setbuy(venta); 
  setBuy(true);
};


  const close_buy = () => {
    setBuy(false); 
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg p-6 w-full sm:w-[50%] md:w-[30%] max-w-lg relative md:right-[35%] h-screen">
          <h2 className="text-xl font-bold mb-4">Carrito de compras</h2>
          {cartItems.length === 0 ? (
            <p>No has seleccionado nada aún para añadir al carrito.</p>
          ) : (
            <>
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center mb-2">
                  <p>{item.nombre} x {item.quantity}</p>
                  <p>${(item.precio * item.quantity).toFixed(3)}</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500"
                  >
                    ❌
                  </button>
                </div>
              ))}
              <hr />
              <h3 className="mt-4 font-bold">Total A Pagar: ${total.toFixed(3)}</h3>
            </>
          )}

          <div className="flex justify-end mt-4">
           {cartItems.length>0 &&(
            <button
              onClick={modal_buy}
              className="bg-transparent text-gray-500 px-4 py-2 hover:bg-red-700 border-2 border-red-700 rounded-xl m-4 hover:text-white"
            >
              Comprar
            </button>
           )}      
         
            <button
              onClick={onClose}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-[#003333] m-4"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>

      {modalbuy && <Buys onclose={close_buy} data={databuy} />}
    </>
  );
};
