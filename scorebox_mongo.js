let MongoClient = require("mongodb").MongoClient ;
let url = "mongodb://localhost:27017/";

var util = require('util');
//[object object]の中身を確認するモジュール

module.exports = class Score{
  constructor(pass,num,score){
    this.pass = pass ;
    this.num = num ;
    this.score = score ;
    //passさんの含むドキュメントを探す。
    //scoreのnum番目にthis.scoreを挿入
  } ;
  findOneAndUpdate(){
    MongoClient.connect(url,{ useNewUrlParser: true },(err, db) =>{
      if (err) throw err ;
      let dbo = db.db("mydb") ;
      if(this.num==1){
        console.log(this.pass+"の"+"第"+this.num+"回を書き換えました") ;
        dbo.collection("score").findOneAndUpdate(
          { pass : this.pass },
          { $set : { score1 : this.score } }
        )
      }
      if(this.num==2){
        console.log(this.pass+"の"+"第"+this.num+"回を書き換えました") ;
        dbo.collection("score").findOneAndUpdate(
          { pass : this.pass },
          { $set : { score2 : this.score } }
        )
      }
      if(this.num==3){
        console.log(this.pass+"の"+"第"+this.num+"回を書き換えました") ;
        dbo.collection("score").findOneAndUpdate(
          { pass : this.pass },
          { $set : { score3 : this.score } }
        )
      }
      if(this.num==4){
        console.log(this.pass+"の"+"第"+this.num+"回を書き換えました") ;
        dbo.collection("score").findOneAndUpdate(
          { pass : this.pass },
          { $set : { score4 : this.score } }
        )
      }
      if(this.num==5){
        console.log(this.pass+"の"+"第"+this.num+"回を書き換えました") ;
        dbo.collection("score").findOneAndUpdate(
          { pass : this.pass },
          { $set : { score5 : this.score } }
        )
      }
      if(this.num==6){
        console.log(this.pass+"の"+"第"+this.num+"回を書き換えました") ;
        dbo.collection("score").findOneAndUpdate(
          { pass : this.pass },
          { $set : { score6 : this.score } }
        )
      }
      if(this.num==7){
        console.log(this.pass+"の"+"第"+this.num+"回を書き換えました") ;
        dbo.collection("score").findOneAndUpdate(
          { pass : this.pass },
          { $set : { score7 : this.score } }
        )
      }
      if(this.num==8){
        console.log(this.pass+"の"+"第"+this.num+"回を書き換えました") ;
        dbo.collection("score").findOneAndUpdate(
          { pass : this.pass },
          { $set : { score8 : this.score } }
        )
      }
      if(this.num==9){
        console.log(this.pass+"の"+"第"+this.num+"回を書き換えました") ;
        dbo.collection("score").findOneAndUpdate(
          { pass : this.pass },
          { $set : { score9 : this.score } }
        )
      }
      if(this.num==10){
        console.log(this.pass+"の"+"第"+this.num+"回を書き換えました") ;
        dbo.collection("score").findOneAndUpdate(
          { pass : this.pass },
          { $set : { score10 : this.score } }
        )
      }
      if(this.num==11){
        console.log(this.pass+"の"+"第"+this.num+"回を書き換えました") ;
        dbo.collection("score").findOneAndUpdate(
          { pass : this.pass },
          { $set : { score11 : this.score } }
        )
      }
      if(this.num==12){
        console.log(this.pass+"の"+"第"+this.num+"回を書き換えました") ;
        dbo.collection("score").findOneAndUpdate(
          { pass : this.pass },
          { $set : { score12 : this.score } }
        )
      }
      if(this.num==13){
        console.log(this.pass+"の"+"第"+this.num+"回を書き換えました") ;
        dbo.collection("score").findOneAndUpdate(
          { pass : this.pass },
          { $set : { score13 : this.score } }
        )
      }
      if(this.num==14){
        console.log(this.pass+"の"+"第"+this.num+"回を書き換えました") ;
        dbo.collection("score").findOneAndUpdate(
          { pass : this.pass },
          { $set : { score14 : this.score } }
        )
      }
      if(this.num==15){
        console.log(this.pass+"の"+"第"+this.num+"回を書き換えました") ;
        dbo.collection("score").findOneAndUpdate(
          { pass : this.pass },
          { $set : { score15 : this.score } }
        )
      }
    });
  }
}
