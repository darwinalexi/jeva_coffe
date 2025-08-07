import {Router} from "express";
import { create_comment, promedi, see_comment, SubirImg } from "../controllers/controller_coment.js";

export const router_comment= Router();

router_comment.get("/listar_comentarios/:id_producto", see_comment)
router_comment.get("/promedio/:id_producto", promedi)
router_comment.post("/crear_comentario",SubirImg, create_comment)