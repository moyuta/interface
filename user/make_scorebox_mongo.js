let MongoClient = require("mongodb").MongoClient ;
let url = "mongodb://localhost:27017/";
//registration時に学生番号と空のscoreboxのコレクションを作成する
let insert = function(pass){
  let s1 = "" ;
  let s2 = "" ;
  let s3 = "" ;
  let s4 = "" ;
  let s5 = "" ;
  let s6 = "" ;
  let s7 = "" ;
  let s8 = "" ;
  let s9 = "" ;
  let s10 = "" ;
  let s11 = "" ;
  let s12 = "" ;
  let s13 = "" ;
  let s14 = "" ;
  let s15 = "" ;

  MongoClient.connect(url,{ useNewUrlParser: true },(err, db) =>{
    if (err) throw err ;
    let dbo = db.db("mydb") ;
    let scorebox = {
      pass : pass,
      score1 : s1 ,
      score2 : s2 ,
      score3 : s3 ,
      score4 : s4 ,
      score5 : s5 ,
      score6 : s6 ,
      score7 : s7 ,
      score8 : s8 ,
      score9 : s9 ,
      score10 : s10 ,
      score11 : s11 ,
      score12 : s12 ,
      score13 : s13 ,
      score14 : s14 ,
      score15 : s15 ,
    } ;
    dbo.collection("score").insertOne(scorebox, function(err, res) {
      if (err) throw err ;
      console.log(pass + "のscoreboxをつくりました") ;
      db.close() ;
    }) ;
  }) ;
}
module.exports = insert ;
//
