
// var FormData = require('form-data');
// var configSync = new FormData();
// configSync.append("certificate_alias","APITESTE");
// configSync.append("documents_destination","AWS_S3");
// configSync.append("mode","sync");
// configSync.append("type","CMS-attached");
// configSync.append("notification_callback","http://endpointx.com?tcn=");
// configSync.append("hash_algorithm","SHA1");
// configSync.append("signature_settings","");
// configSync.append("auto_fix_document","");
// configSync.append("tsa_server_id","");
// configSync.append("tsa_hash_algorithm","");
// configSync.append("documents_source","DATA_URL");

// module.exports = configSync ; 

const configSync = {
    "certificate_alias":"APITESTE",
    "mode":"sync",
    "type":"PDFSignature",
    "hash_algorithm":"SHA256",
    "signature_settings":"",
    "auto_fix_document":"",
    "tsa_server_id":"",
    "tsa_hash_algorithm":"",
    "documents_source":"DATA_URL"
}

module.exports = configSync ; 

