import { Router } from "express";
import { login } from "../controllers/autentication.js";

export const router_aut=Router();
router_aut.post("/login", login);