let Scorebox_mongo = require("./score_Mongo/scorebox_mongo.js") ;
 let score = function(data){
   console.log(data) ;
 let p = /[=_]/ ;
 let result = data.split(p);
  console.log(result[0]) ;
  let user = new Scorebox_mongo(result[0],result[1],result[2]) ;
  user.findOneAndUpdate() ;
 }
 module.exports = score ;
//
