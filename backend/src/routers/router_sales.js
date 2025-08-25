import {Router} from "express"
import {count_sales_client, count_sales, count_sales_entregado, count_sales_not_entregadas, create_sales, see_buy_client, see_sales, update_sales } from "../controllers/controller_sales.js";
import { validationsales } from "../middleware/middeleware_sales.js";

export const router_sales= Router();

router_sales.get("/contar_ventas", count_sales)
router_sales.get("/contar_ventas_entregadas", count_sales_entregado)
router_sales.get("/contar_ventas_no_entregadas", count_sales_not_entregadas)
router_sales.post("/crear_venta", validationsales,create_sales)
router_sales.get("/listar_ventas", see_sales)
router_sales.put("/entregar/:id", update_sales)
router_sales.get("/listar_compras_cliente/:id_cliente",see_buy_client)
router_sales.get("/contar_ventas_cliente/:id_cliente",count_sales_client)