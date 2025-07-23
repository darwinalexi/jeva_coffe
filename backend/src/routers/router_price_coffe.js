import {Router} from "express";
import {obtenerPrecioFNC, obtenerPrecioCafeHuila} from "../controllers/controller_coffe_price.js"
export const coffe_price= Router();
coffe_price.get("/precionacional", obtenerPrecioFNC)
coffe_price.get("/preciohuila", obtenerPrecioCafeHuila)