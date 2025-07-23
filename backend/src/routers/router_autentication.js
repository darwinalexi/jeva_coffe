import { Router } from "express";
import { change_password, login } from "../controllers/autentication.js";

export const router_aut=Router();
router_aut.post("/login", login);
router_aut.post("/recuperar", change_password)