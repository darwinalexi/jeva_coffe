import {Router} from "express";
import { validatorclientcreate } from "../middleware/middeleware_clients.js";
import { count_client, create_client, show_client, see_client } from "../controllers/controller_cliets.js";

export const router_client=Router();

router_client.post("/cliente", validatorclientcreate, create_client)
router_client.get("/cliente", count_client)
router_client.get("/ver_cliente", show_client)
router_client.get("/ver_cliente/:identificacion", see_client)