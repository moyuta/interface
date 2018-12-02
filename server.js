let fs  = require("fs") ;
let url = require('url') ;
let app = require("http").createServer(handler).listen(3000) ;
console.log("server start!") ;

const login_true=fs.readFileSync("login_true.html","utf8");

function handler(req,res){
  var q = url.parse(req.url, true) ;

  switch(q.pathname){
    case "/":
    fs.readFile("./top.html","utf8",write_res) ;
    break ;

    case "/login.html":
    fs.readFile("./login.html","utf8",(err,data)=>{
      if(err){
        res.writeHead(500) ;
        return res.end("Error") ;
      }
      res.writeHead(200,{"Content-Type":"text/html"}) ;
      res.write(data) ;
      login_socket(req,res,function(){
        res.end() ;
      });
    });
    break ;


    case "/file.html":
    fs.readFile("./file.html","utf8",(err,data)=>{
      res.writeHead(200);
      res.write(data);
      res.end();
    });
    break ;

    case "/fileupload" :
    file_socket(req, res);
    res.write('File uploaded and moved!');
    res.end();
    break ;

    case "/registration.html":
    fs.readFile("./registration.html","utf8",write_res) ;
    registration_socket() ;
    break ;

    default :
    res.writeHead(500) ;
    return res.end("Error") ;
    break ;
  }

  function write_res(err,data){
    if(err){
      res.writeHead(500) ;
      return res.end("Error") ;
    }
    res.writeHead(200,{"Content-Type":"text/html"}) ;
    res.write(data) ;
    res.end() ;
  }
}

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
}

function login_socket(req,res){

  io.sockets.on("connection",function(socket){
    socket.on("emit_data",function(data){
      console.log(data) ;
      let user = new Mongo(data.name,data.password) ;
      user.login(req,res) ;
    });
  });
}


let file = require("./file.js") ;

function file_socket(req,res){
  file(req,res);
  io.sockets.on("connection",function(socket){
    console.log("connect") ;
    socket.on("upload",function(data){
      console.log(data) ;
      socket.emit("move",data);
    });
  });

}
