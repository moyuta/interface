let MongoClient = require("mongodb").MongoClient;
let fs  = require("fs") ;
const login_true=fs.readFileSync("login_true.html","utf8");
const login_false=fs.readFileSync("login_false.html","utf8");


let url = "mongodb://localhost:27017/";
module.exports = class Mongo{
  constructor(name,password){
    this.name = name ;
    this.password = password ;
  }
  registration(){
    MongoClient.connect(url,{ useNewUrlParser: true }, (err, db) =>{
      if (err) throw err;
      let dbo = db.db("mydb");
      let myobj = {name : this.name, password : this.password } ;
      dbo.collection("students").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
        db.close();
      });
    });
  }
  login(req,res){
    console.log("login") ;

    MongoClient.connect(url,{ useNewUrlParser: true }, (err, db) =>{
      if (err) throw err ;
      let myobj = {name : this.name, password : this.password } ;
      let dbo  = db.db("mydb");

      dbo.collection("students").findOne(myobj,(err,result)=>{
        if(result==null){
          console.log("あなたは登録されていません")
          res.write(login_false) ;
        }else{
          console.log("name:" + this.name + ",password:" + this.password + "は既に登録しています") ;
          res.write(login_true) ;
        }
        db.close() ;
      });
    });

  }
}
