let MongoClient = require("mongodb").MongoClient ;
let url = "mongodb://localhost:27017/";

let insert = function(name,msg,day){
  MongoClient.connect(url,{ useNewUrlParser: true },(err, db) =>{

    if (err) throw err ;
    let dbo = db.db("mydb") ;
    let mymsg = {user : name, message : msg , time : day} ;
    dbo.collection("chat").insertOne(mymsg, function(err, res) {
      if (err) throw err ;
      console.log("コメントを追加しました") ;
      db.close() ;
    }) ;
  }) ;
} ;

let findall = function(){
  let pr = new Promise(function(resolve, reject){
    MongoClient.connect(url, { useNewUrlParser: true },function(err, db) {

      if (err) throw err;
      let dbo = db.db("mydb");
      dbo.collection("chat").find({},{ projection: { _id: 0 } }).toArray(function(err, result) {
        if (err) throw err;
        resolve(result) ;
        db.close();
      });
    });
  });
  return pr;
} ;

module.exports.insert = insert ;
module.exports.findall = findall ;
//
