const _ = require("underscore");
const amb = {
    test:{

    },
    development:{
        port: 3000,
        client_id: "clientleonardo",
        client_secret: "clientleonardo",
        
    },
    production:{

    }
}

module.exports = (pEnvironment)=>{
    let processEnv = _.pick({
        client_id: process.env.CLIENT_ID_CESS,
        client_secret : process.env.CLIENT_SECRET_CESS

    },(value)=> value !=null);

    let env = amb[pEnvironment||"development"];
    _.extend(env, processEnv);

    return env; 
}