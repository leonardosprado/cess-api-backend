const { json } = require('body-parser');
var express = require('express');
var axiosInstance = require('../../config/cess-api/axiosconfig');
const validateAuthorization = require('../../middlewares/validateAuthorization');
var configsignature = require('./config');
var router = express.Router();
var signatureWriter = require('./signatureWriter');
var writer = new signatureWriter();



router.post('/signature-service',(req,res,next)=>{
    validateAuthorization(req,res,next,axiosInstance);
},(req,res)=>{
    axiosInstance.post('/signature-service',configsignature).then(async (response)=>{
        var writerbool = await writer.Write('signature.tcn',response.data);
        console.log(writerbool);
        if(writerbool){
            res.send(response.data);
        }
        else{
            res.statusCode = 400;
            res.json({'message':'Erro ao gravar no arquivo'})
        }
    }).catch((err)=>{
        res.statusCode = 400;
        res.send(err.data?err.data:err);
    });
});




module.exports = router;