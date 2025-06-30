

export const Carsmodal = ({ onClose, cartItems, setCartItems }) => {
  const total = cartItems.reduce((sum, item) => sum + item.precio * item.quantity, 0);
  
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
<div className="bg-white rounded-lg p-6 w-full sm:w-[50%]  md:w-[30%] max-w-lg relative md:right-[35%] h-screen">
        <h2 className="text-xl font-bold mb-4">Carrito de compras</h2>
        {cartItems.length === 0 ? (
          <p>No has Seleccionado nada aun para añadir al carrito </p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center mb-2">
                <p>
                  {item.nombre} x {item.quantity}
                </p>
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
          <button onClick={onClose} className="bg-gray-600 text-white px-4 py-2 rounded  hover:bg-[#003333]   ">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
