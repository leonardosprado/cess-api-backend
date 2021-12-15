async function fileToBase64(file) {
    return new Promise((resolve, reject) => {
     if (!file.type.match('pdf')) {
      return reject(new Error('INVALID_FILE'));
     }
   
     if (!file.type.match('pdf') && !file.type.match('pdf') && !file.type.match('pdf')) {
      return reject(new Error('INVALID_FILE'));
     }
     const reader = new FileReader();
     reader.readAsDataURL(file);
     reader.onloadend = function() {
      const base64data = reader.result;
      resolve(base64data);
     };
    });
}

module.exports = fileToBase64;