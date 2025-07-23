import { Router } from "express";
import { all_product, count_product_avalible, count_product_no_avalible, create_productos, delete_product, see_a_product, show_productos_avalible, show_productos_notavalible, SubirImg, update_productos } from "../controllers/controller_product.js";
import {validatorproductcreate, validatorproductupdate } from "../middleware/middleware_products.js";
import { validarToken } from "../controllers/autentication.js";

export const Router_product= Router();
Router_product.get('/productos_disponibles', show_productos_avalible)
Router_product.get('/productos_no_disponibles', show_productos_notavalible)
Router_product.post("/productos", validarToken,SubirImg, validatorproductcreate, create_productos)
Router_product.put("/productos/:id",SubirImg, validatorproductupdate, update_productos)
Router_product.delete("/productos/:id", validarToken,delete_product)
Router_product.get("/contar_productos_disponibles", count_product_avalible)
Router_product.get("/contar_productos_no_disponibles", count_product_no_avalible)
Router_product.get("/todos_productos", all_product)
Router_product.get("/producto/:id", see_a_product)