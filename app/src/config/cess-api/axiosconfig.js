var axios = require('axios');
const axiosInstance = axios.create({
    baseURL:process.env.CESS_URL,
    headers:{
        'Content-Type':'application/json',
        'Accept':"*/*",
        'Access-Control-Allow-Methods': 'POST, GET',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Max-Age': 86400,
    }
})

module.exports = axiosInstance;