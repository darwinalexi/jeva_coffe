import {Router} from "express"
import { count_sales, create_sales } from "../controllers/controller_sales.js";

export const router_sales= Router();

router_sales.get("/contar_ventas", count_sales)
router_sales.post("/crear_venta", create_sales)