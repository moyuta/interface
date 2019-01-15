let CryptoJS = require("crypto-js") ;

let crypto=function(text,key){
  let decrypted = CryptoJS.AES.decrypt(text, key) ;
  return decrypted.toString(CryptoJS.enc.Utf8) ;
} ;

module.exports = crypto ;
