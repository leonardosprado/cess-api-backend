const fs = require('fs');
const { stringify } = require('querystring');
const util = require('util');
class signatureWriter{

    constructor(){
        this.writer = util.promisify(fs.writeFile);
    }

    async Write(filename,data){
        try {
            var tcn = data.tcn;
            console.log(tcn);
            await this.writer(filename,tcn);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

module.exports = signatureWriter;