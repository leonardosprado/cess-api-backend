var express = require('express');
var axios = require('axios');
var router = express.Router();

router.post('/',(req,res,next)=>{
    console.log(req.headers);
    console.log('Time:', Date.now());
    next();
},(req,res)=>{
    authenticate(req,res)
});

module.exports = router;


function authenticate(req,res){
    const {login,otp} = req.body;

    axios.post(`${process.env.CESS_URL}/oauth/pwd_authorize`,{
        client_id:process.env.CLIENT_ID_CESS,
        client_secret:process.env.CLIENT_SECRET_CESS,
        username:login,
        password:otp,
        grant_type:"password"
    })
    .then((response)=>{
        console.log(response);
        res.send(response.data);
    })
    .catch((error)=>{
        res.statusCode = 400;
        res.send(error);
    });
}