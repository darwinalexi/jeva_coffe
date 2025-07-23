import { Router } from "express";
import { select_departament } from "../controllers/controller_departament.js";

export const router_departament=Router();

router_departament.get("/departamentos", select_departament)