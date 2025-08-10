import { Router } from "express";
import { change_password, login, send_email } from "../controllers/autentication.js";

export const router_aut=Router();
router_aut.post("/login", login);
router_aut.post("/recuperar", send_email)
router_aut.post("/cambiar_clave", change_password);