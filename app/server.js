const express = require('express');
var cors = require('cors')
require('dotenv/config');
const bodyParser = require("body-parser");
const { json } = require("body-parser");
const app = express();
app.use(cors());
app.options('*', cors());
const environment = require('./environment')();


// // View Engine
// app.set("view engine",'ejs');
// app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



require("./src/routes/routes")(app);
let port = Number(environment.port);
// Body Parser

app.listen(port,function(erro){
    if(erro){
        console.log("Ocorreu um erro!");
    }
    else{
        console.log(`Servidor iniciado na porta ${port} com sucesso!`)
    }
})