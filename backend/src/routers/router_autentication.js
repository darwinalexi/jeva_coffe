import { Router } from "express";
import { change_password, login, send_email } from "../controllers/autentication.js";
import { ValidationChangepasword, ValidationEmail, Validationlogin } from "../middleware/middeleware_autentication.js";

export const router_aut=Router();
router_aut.post("/login", Validationlogin,login);
router_aut.post("/recuperar",ValidationEmail ,send_email)
router_aut.post("/cambiar_clave", ValidationChangepasword,change_password);