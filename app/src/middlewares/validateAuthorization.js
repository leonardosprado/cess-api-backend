const validateAuthorization = (req,res,next,axiosInstance)=>{
   
    const authorization = req.headers.authorization;

    if(!authorization || authorization == undefined || authorization == ""){
        res.statusCode = 401;
        res.json({'message':"Unauthorized"});
    }
    else{
        axiosInstance.interceptors.request.use(function (config){
            config.headers.Authorization =  authorization;
            return config;
        }, function(error){
            return Promise.reject(error);
        })
        next();
    }
}
module.exports = validateAuthorization;
