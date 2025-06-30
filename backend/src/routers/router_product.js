import { Router } from "express";
import { create_productos, delete_product, show_productos_avalible, show_productos_notavalible, SubirImg, update_productos } from "../controllers/controller_product.js";
import {validatorproductcreate, validatorproductupdate } from "../middleware/middleware_products.js";
import { validarToken } from "../controllers/autentication.js";

export const Router_product= Router();
Router_product.get('/productos_disponibles', show_productos_avalible)
Router_product.get('/productos_no_disponibles', show_productos_notavalible)
Router_product.post("/productos", validarToken,SubirImg, validatorproductcreate, create_productos)
Router_product.put("/productos/:id", validarToken,SubirImg, validatorproductupdate, update_productos)
Router_product.delete("/productos/:id", validarToken,delete_product)