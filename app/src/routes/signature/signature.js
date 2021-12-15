var fs = require('fs');
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

// var FormData = require('form-data');
// const FileReader = require('filereader')

const fileToBase64 = require('../../middlewares/b64');



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
    try {
        var documents = req.files.documents.length>1?req.files.documents:[req.files.documents];
        var documentsList = {};
        var doc = [];
        if(!documents){
            throw("No Files!");
        }
        if(documents){
            for (let i = 0; i < documents.length; i++) {
                var element = documents[i];
                const contents = fs.readFileSync(element.path, {encoding: 'base64'});
                baseURI = 'data:application/pdf;base64,'+contents;
                doc = [...doc,{id:i,'data':baseURI}];
            }
            documentsList = ({"documents":doc});
        }
        configSync = {...configSync,...documentsList};
        console.log(configSync);
        axiosInstance.post('/signature-service',configSync).then(async (response)=>{
            res.send(response.data);
        }).catch((error)=>{
            res.statusCode = error.response.status? error.response.status:400;
            res.send(error.response.data);
        });
    } catch (error) {
        console.log(error);
        res.statusCode = 403;
        res.send(error);
    }
});

router.get('/download/:tcn',(req, res)=>{
    try {
        var tcn = req.params.tcn;
        axiosInstance.get('/signature-service/'+tcn).then(response=>{
            res.send(response.data);
        }).catch(error=>{
            res.statusCode = 400;
            res.send(error);
        })
    } catch (error) {
        console.log(error);
        res.send(error)
    }

});

router.get('/download/:tcn/:id',(req, res)=>{
    try {
        var tcn = req.params.tcn;
        var id = req.params.id;
        axiosInstance.get('/file-transfer/'+tcn+'/'+id,{responseType: 'arraybuffer'}).then( async response=>{
            var fileContents = Buffer.from(response.data, "base64");
            const fileName = tcn+"-"+id+".pdf";
            var savedFilePath = 'temp/' + fileName;
            fs.writeFile(savedFilePath, fileContents, function() {
                res.status(200).download(savedFilePath, fileName);
            }); 
        }).catch(error=>{
            console.log(error);
            res.statusCode = 404;
            res.send(error);
        })
    } catch (error) {
        console.log(error);
        res.send(error)
    }
});


module.exports = router;