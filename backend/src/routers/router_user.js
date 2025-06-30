import { Router } from "express";
import { delete_user, register_user, searcher_user, show_user, SubirImg, update_user } from "../controllers/controller_users.js";
import { validationusercreate, validationuserupdate } from "../middleware/middleware_users.js";

export const router_user=Router();
router_user.post("/usuarios",SubirImg,validationusercreate,register_user)
router_user.put("/usuarios/:identificacion", SubirImg,validationuserupdate, update_user);
router_user.get("/usuarios", show_user)
router_user.get("/usuario/:identificacion", searcher_user)
router_user.delete("/usuarios/:identificacion", delete_user)