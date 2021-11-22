const baseUrl = process.env.API_URL;
express = require('express');
router = express.Router();

const routes = (app)=>{
    
    app.use('/',router.get("/",(req,res)=>{
        res.send(`<h1 style="#000">API CESS 1.0</h1>`)
    }))
    app.use('/api/auth',require('./auth/authRouter'));
    
    app.use('/api/signature',require('./signature/signature'));

    // oauth/client_maintenance
    /*
        {
        "client_id": "218839510018",
        "client_secret": "gaitVisbivteusyees4",
        "redirect_uris": ["https://vafirmadev.com:3000","https://vafirmadev.com:8080/servlets/NubeVaultId2Servlet","https://backend-dot-vafirma-preprod.uc.r.appspot.com/servlets/NubeVaultId2Servlet"]
        }
    */
}

module.exports = routes;