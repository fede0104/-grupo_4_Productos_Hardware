const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session')
const cookieParser = require('cookie-parser')
const remember = require('./middlewares/remember')
const locals = require('./middlewares/locals')

let mainRoutes = require('./routes/main.js');
let rutasProductos = require('./routes/products.js');
//let cartRoutes = require('./routes/prodCart.js');
let adminRoutes = require('./routes/admin.js');
let userRoutes = require('./routes/users.js');

//para metodos post
const methodOverride = require("method-override"); 
const req = require('express/lib/request');
app.use(methodOverride("_method"));

app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.urlencoded({ extended: false })); //para capturar envios por post en "req.body"
app.use(express.json());
app.use(session( {secret: "la clave secreta"}));
app.use(cookieParser());
app.use(remember);
app.use(locals);

app.set("view engine", 'ejs');
app.set("views",["./views","./views/admin","./views/users"]);
//app.set("views","./views");


let PUERTO = 3000
app.listen(process.env.PORT || PUERTO, () => console.log("server: ON  Port:", PUERTO));
//MAIN ROUTES (home)
app.use('/', mainRoutes);

//login-register-profile
app.use('/', userRoutes);

//SHOPING CART
//app.use('/', cartRoutes);

//PRODUCT DETAIL & PRODUCT GALERY
app.use('/products', rutasProductos);

//ADMIN
app.use('/admin', adminRoutes)

//404
app.use((req, res, next)=>{
    res.status(404).render('notFound');
    next();
})
