import Router from "express";
import { select_municipality } from "../controllers/controller_municipailty.js";

export const router_municipality= Router();
router_municipality.get("/seleccionar_municipio/:id_departamento", select_municipality);