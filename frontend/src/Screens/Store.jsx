import Imagen from "../Components/Image";
import NavBar from "../Components/NavBar";
import Cafeimg from "../../src/assets/img/cafe.png";
import axiosClient from "../utils/axiosClient";
import { useState, useEffect } from "react";
import { baseurl } from "../utils/data";
import { Carsmodal } from "../Components/Carsmodal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Swl from "sweetalert2";
import SearchBar from "../Components/Searchar"//Importa el componente SearchBar

export const Store = () => {
    const [date, setdata] = useState([]);
    const [openmodal, setmodal] = useState(null);
    const [carsitems, setcars] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

    const products_avalibles = async () => {
        try {
            const show = await axiosClient.get("/productos_disponibles");
            setdata(show.data);
            console.log("datos", show.data);
        } catch (error) {
            console.log("error", error);
        }
    };

    const Cars_Product = async () => {
        setmodal(true);
    };

    const addToCart = (product) => {
        setcars((prev) => {
            const exist = prev.find((item) => item.id === product.id);
            if (exist) {
                if (exist.quantity >= product.unidades_disponibles) {
                    Swl.fire({
                        title: 'Advertencia',
                        icon: 'warning',
                        text: `No hay suficientes unidades disponibles. Solo hay ${product.unidades_disponibles} en stock.`
                    });
                    return prev;
                }
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                Swl.fire({
                    title: 'Éxito',
                    icon: 'success',
                    text: `${product.nombre} ha sido añadido al carrito!`
                });
                return [...prev, { ...product, quantity: 1 }];
            }
        });
    };

    const Cars_Product_close = async () => {
        setmodal(false);
    };

    useEffect(() => {
        products_avalibles();
    }, []);

    return (
        <div>
            <NavBar />
            <div className="relative w-full">
                <img alt="Venta de café" className="w-full h-full object-cover" src={Cafeimg} />
                <p className="absolute inset-0 flex items-center justify-start text-4xl tracking-wide-[12%] font-bold text-orange-500 text-center z-10 t">
                    UNA TAZA DE CAFE ES LA RESPUESTA <br /> A MUCHOS INTERROGANTES
                </p>
            </div>
            <div>
                <h1 className="font-bold flex justify-center text-3xl">Productos Disponibles</h1>
                
                {/* Componente SearchBar */}
                <div className="flex justify-center mb-4  mt-4">
                    <SearchBar 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                        placeholder="Buscar productos de Jeva Coffe.."
                    />
                </div>

                <button className="flex contain-inline-size gap-3 w-[50%]">
                    <FontAwesomeIcon icon={faShoppingCart} onClick={Cars_Product} />
                    <h4>Carrito de Compras</h4>
                </button>

                <div className="sm:grid grid-cols-1 p-7 gap-4 md:grid grid-cols-3 p-3">
                {date.filter(item => 
                    item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) // Filtra los productos
                ).map((item) => (
                    <div key={item.id} className="border-2 border-[#003333] shadow-lg mb-12 hover:shadow-green-900 rounded-xl w-[80%]">
                        <h1 className="flex justify-center font-bold">{item.nombre}</h1>
                        <img src={`${baseurl}/img/${item.imagen}`} className="rounded-xl ml-10 w-[74%]" />
                        <p className="flex justify-center">Precio: ${item.precio}</p>
                        <p className="flex justify-center">Unidades Disponibles: {item.unidades_disponibles}</p>
                        <button className="bg-orange-500 text-white px-3 py-1 mt-2 rounded relative left-[28%] mr-16 mb-3"
                            onClick={() => {
                                addToCart(item);
                            }}
                        >
                            Agregar al carrito
                        </button>
                    </div>
                ))}
                {/* Mensaje si no se encuentran productos */}
                {date.filter(item => 
                    item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
                ).length === 0 && (
                    <p className="flex justify-center text-red-500 mt-4">No se encontraron productos que coincidan con "{searchTerm}".</p>
                )}
            </div>
            </div>
            {openmodal && (
                <Carsmodal
                    onClose={Cars_Product_close}
                    cartItems={carsitems}
                    setCartItems={setcars}
                />
            )}
        </div>
    );
};
