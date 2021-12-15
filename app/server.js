const express = require('express');
var cors = require('cors')
require('dotenv/config');
const bodyParser = require("body-parser");
const formData = require("express-form-data");

const app = express();
app.use(cors());
app.options('*', cors());
const environment = require('./environment')();


app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(formData.parse());



require("./src/routes/routes")(app);
let port = Number(environment.port);


app.listen(port,function(erro){
    if(erro){
        console.log("Ocorreu um erro!");
    }
    else{
        console.log(`Servidor iniciado na porta ${port} com sucesso!`)
    }
})