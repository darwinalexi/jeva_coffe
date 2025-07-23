import {Router} from "express"
import { count_sales, count_sales_entregado, count_sales_not_entregadas, create_sales } from "../controllers/controller_sales.js";

export const router_sales= Router();

router_sales.get("/contar_ventas", count_sales)
router_sales.get("/contar_ventas_entregadas", count_sales_entregado)
router_sales.get("/contar_ventas_no_entregadas", count_sales_not_entregadas)
router_sales.post("/crear_venta", create_sales)