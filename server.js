let app = require("http").createServer(handler).listen(3000) ;
console.log("server start!") ;

let fs  = require("fs") ;
let login = fs.readFileSync("./login.html") ;
let registration = fs.readFileSync("./registration.html") ;
let top =  fs.readFileSync("./top.html") ;
let file = fs.readFileSync("./file.html") ;
let chat = fs.readFileSync("./chat.html") ;
let upload = fs.readFileSync("./upload.html") ;

let url = require('url') ;
let qs = require("querystring") ;
function handler(req,res){
  res.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}) ;
  let q = url.parse(req.url, true) ;

  switch(q.pathname){
    case "/" :
    res.write(top) ;
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
let Mongo = require("./mongo.js") ;

function registration_socket(req,res){
  io.sockets.on("connection",function(socket){
    socket.on("emit_data",function(data){
      console.log(data) ;
      let user = new Mongo(data.name,data.password) ;
      user.registration() ;
    });
  });
} ;


let crypto = require("./crypto.js") ;
function login_socket(req,res){

  io.sockets.on("connection",(socket)=>{
    let key = "aiueo" ;
    socket.emit("key",key) ;
    console.log("keysend!") ;
    socket.on("cryp",(data)=>{
      let id = socket.id ;
      let name = crypto(data.name,key) ;
      let password = crypto(data.password,key) ;
      io.to(id).emit("name",name) ;
      console.log("暗号:" + data.name + "\n複合:"+ name) ;
      console.log("暗号:" + data.password + "\n複合:" + password) ;
      let user = new Mongo(name,password) ;
      user.login(req,res) ;
    });
  });
} ;

let filemove = require("./file.js") ;

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
let chat_insert=require("./chat.js").insert ;
let chat_find=require("./chat.js").findall ;
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
