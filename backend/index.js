import express from "express"
import body_parser from 'body-parser'
import { Router_product } from "./src/routers/router_product.js";
import { router_user } from "./src/routers/router_user.js";
import { router_aut } from "./src/routers/router_autentication.js";
import {router_sales} from "./src/routers/router_sales.js"
import cors from "cors"
import { router_municipality } from "./src/routers/router_municipaly.js";
import { router_client } from "./src/routers/router_client.js";
import { router_departament } from "./src/routers/router_departament.js";
import {coffe_price} from "./src/routers/router_price_coffe.js"
import { router_comment } from "./src/routers/router_comment.js";

const server =express();

const port = 3333;

server.use(body_parser.json())
server.use(body_parser.urlencoded({extend:false}))
server.use(express.static('public'))

server.use(cors());
server.use(router_aut)
server.use(Router_product)
server.use(router_user)
server.use(router_municipality)
server.use(router_sales);
server.use(router_client);
server.use(coffe_price)
server.use(router_comment)
server.use(router_departament);

server.use(cors({
    origin: "http://localhost:5173",
    methods: ["POST"],
    credentials: true,
}))

server.get('/',(req,res)=>{
    res.send("Hola, este es el servidor de la aplicacion jevacoffee");
})  

server.listen(port,()=>{
    console.log(`servidor corriendo en el puerto ${port}`)
})

server.set('view engine', 'ejs');
server.set('views', './public/view');  
server.get('/documentacion', (req, res) => {
    res.render('documen.ejs', { title: 'Documentación de la API' });
}); 