let app = require("http").createServer(handler).listen(3000) ;
console.log("server start!") ;

let fs  = require("fs") ;
let login = fs.readFileSync("./html/login.html") ;
let registration = fs.readFileSync("./html/registration.html") ;
let top =  fs.readFileSync("./html/top.html") ;
let file = fs.readFileSync("./html/file.html") ;
let chat = fs.readFileSync("./html/chat.html") ;
let upload = fs.readFileSync("./html/upload.html") ;
let teacher = fs.readFileSync("./html/teacher.html") ;
//let login_teacher = fs.readFileSync("./html/login_teacher.html") ;


let url = require('url') ;
let qs = require("querystring") ;
let score = require("./score/score.js")
function handler(req,res){
  res.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}) ;
  let q = url.parse(req.url, true) ;
  if(req.method == "POST"){

    let box = "" ;
    req.on("data",function(data){
      box += data ;
    }) ;
    req.on("end",function(){
      score(box) ;
      console.log(box) ;
      res.end() ;
    }) ;
}

  switch(q.pathname){
    case "/" :
    res.write(top) ;
    res.end() ;
    break ;

    case "/teacher.html" :
    res.write(teacher) ;
    res.end() ;
    break ;

    case "/login.html" :
    res.write(login) ;
    login_socket(req,res,function(){
      res.end() ;
    })
    break ;


    case "/registration.html" :
    res.write(registration) ;
    registration_socket(req,res) ;
    res.end() ;
    break ;

    case "/file.html" :
    res.write(file) ;
    score_socket() ;
    res.end() ;
    break ;

    case "/chat.html" :
    res.write(chat) ;
    chat_socket(function(){
      res.end() ;
    }) ;
    break ;

    case "/fileupload" :
    res.write(upload) ;
    file_socket(req,res) ;
    res.end() ;
    break ;

    default :
    res.writeHead(500) ;
    return res.end("Error") ;
    break ;
  } ;
} ;



let io  = require("socket.io").listen(app) ;
let Mongo = require("./user/user_mongo.js") ;
let makescorebox = require("./user/make_scorebox_mongo.js") ;
function registration_socket(req,res){
  io.sockets.on("connection",function(socket){
    socket.on("emit_data",function(data){
      console.log(data) ;
      let user = new Mongo(data.name,data.password) ;
      user.registration() ;
      makescorebox(data.password) ;
    });
  });
} ;


let crypto = require("./Crypto/crypto.js") ;
function login_socket(req,res){

  io.sockets.on("connection",(socket)=>{
    let key = "aiueo" ;
    socket.emit("key",key) ;
    console.log("keysend!") ;
    socket.on("cryp",(data)=>{
      let name = crypto(data.name,key) ;
      let password = crypto(data.password,key) ;

      console.log("暗号:" + data.name + "\n複合:"+ name) ;
      console.log("暗号:" + data.password + "\n複合:" + password) ;
      if(name=="teacher"&&password=="1234"){
        console.log("あなたは教員です")　;
      res.write(login_teacher) ;
    }else{
      let user = new Mongo(name,password) ;
      user.login(req,res) ;
    }
    });
  });
} ;

let filemove = require("./file/file.js") ;

function file_socket(req,res){
  filemove(req,res);

  io.sockets.on("connection",function(socket){
    console.log("connect") ;
    socket.on("upload",function(data){
      let id = socket.id ;
      console.log(data) ;
      socket.to(id).emit("state","提出済") ;
    });
  });
} ;
let chat_insert=require("./chat/chat.js").insert ;
let chat_find=require("./chat/chat.js").findall ;
function chat_socket(req,res){
  io.sockets.on("connection",function(socket){
    socket.on("msg",function(data){
      let time = new Date() ;
      chat_insert(data.name,data.msg,time) ;
    }) ;
    chat_find().then(function(data) {
      socket.emit("msg_list",data);
    }) ;
  });
};
let Scorebox_mongo = require("./score/score_Mongo/scorebox_mongo.js") ;
 let score_socket = function(){
   io.sockets.on("connection",function(socket){
     socket.on("pass",(pass)=>{
       console.log("passを受け取った")
       console.log(pass);
       let user = new Scorebox_mongo(pass);
  user.finddata().then(function(data) {
         console.log("data:"+JSON.stringify(data)) ;
         socket.emit("data_box",data);
       }) ; ;
     })
   })
 }
