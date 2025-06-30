import express from "express"
import body_parser from 'body-parser'
import { Router_product } from "./src/routers/router_product.js";
import { router_user } from "./src/routers/router_user.js";
import { router_aut } from "./src/routers/router_autentication.js";
import {router_sales} from "./src/routers/router_sales.js"
import cors from "cors"


const server =express();

const port = 3333;

server.use(body_parser.json())
server.use(body_parser.urlencoded({extend:false}))
server.use(express.static('public'))

server.use(cors());
server.use(router_aut)
server.use(Router_product)
server.use(router_user)
server.use(router_sales);

server.listen(port,()=>{
    console.log(`servidor corriendo en el puerto ${port}`)
})

