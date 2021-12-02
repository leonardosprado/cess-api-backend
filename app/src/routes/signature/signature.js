const { json } = require('body-parser');
var express = require('express');
var axiosInstance = require('../../config/cess-api/axiosconfig');
const validateAuthorization = require('../../middlewares/validateAuthorization');
var configsignature = require('./config');
var configSync = require('./syncConfig');
var router = express.Router();
var signatureWriter = require('../../controller/signature/signatureWriter');
var SignatureReader = require('../../controller/signature/signatureReader');
var writer = new signatureWriter();
var Reader = new SignatureReader();
var FormData = require('form-data');



router.post('/signature-service',(req,res,next)=>{
    validateAuthorization(req,res,next,axiosInstance);
},(req,res)=>{
    console.log(req.headers);
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
    }).catch((error)=>{
        res.statusCode = error.response.status? error.response.status:400;
        res.send(error.response.data);
    });
});

router.post('/uploaud',async(req,res)=>{
    try {
        var tcn = await Reader.Read("signature.tcn");
        // var formdata = new FormData();

        // formdata.append('document',req.files)
        // console.log(req.files.document);
        
        if(tcn==undefined || tcn == '' || tcn == null){
            res.statusCode = 401;
            res.json({'message':'tcn invalido'})
        }
        axiosInstance.post(`/file-transfer/${tcn}/eot`,formData).then(data=>{
            res.send(data);
        }).catch(err=>{
    
            res.statusCode = 401;
            res.send(err.response.data);
        });
    } catch (error) {
        console.log(error);
    }
});


router.post('/sync',(req,res,next)=>{
    validateAuthorization(req,res,next,axiosInstance);
},(req,res)=>{
    console.log(req.headers);
    axiosInstance.post('/signature-service',configSync).then(async (response)=>{
        console.log(response.data);
    }).catch((error)=>{
        res.statusCode = error.response.status? error.response.status:400;
        res.send(error.response.data);
    });
});




module.exports = router;