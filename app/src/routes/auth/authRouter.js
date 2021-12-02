var express = require('express');
var axios = require('axios');
const { response } = require('express');
var router = express.Router();

router.post('/',(req,res)=>{
    
    authenticate(req,res)
});

module.exports = router;


function authenticate(req,res){
    const {login,otp} = req.body;
    console.log(login,otp)
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
        res.statusCode = error.response.status? error.response.status:400;
        res.send(error.response.data);
        
    });
}