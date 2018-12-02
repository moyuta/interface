const {spawn} = require("child_process") ;
const file = require("./file.js") ;
let fs = require("fs");
const DIR = "./File_data" ;
const DIR_COPY = "./File_data_copy" ;
const DIR_Absolute = "/Users/motegiyuta/Desktop/interface/File_data_copy/process" ;
const Mainfile = "./File_data_copy/process/process.pde" ;
const DIR_gifshot = "./processing/screenshot_gif/screenshot_gif.pde" ;
const DIR_shot = "./processing/screenshot_image/screenshot_image.pde" ;

let zip = function(dir, path){
  let process = spawn("unzip",[path,"-d",dir]) ;
  process.on('exit', (code) => {
    console.log("thawing");
  });
} ;
//並び替え
let ls = function(){
  let process = spawn("ls",["-lh",DIR]) ;
  process.stdout.on("data", function(data) {
    console.log(`stdout: ${data}`) ;
  }) ;
}

let pj = function() {
  let process = spawn("processing-java", ["--sketch=" + DIR_Absolute  ,"--run" ]) ;
  process.on("exit", (code) => {
    console.log("processing finish!");
  });
}

let rm = function(){
  let process = spawn("rm",["-r",DIR+"/__MACOSX"]) ;
  let process2 = spawn("rm",["-r",DIR_COPY+"/__MACOSX"]) ;
  process.on("exit", (code) => {
    console.log("remove:__MACOSX");
  });
}

let copy = function(ori_path,next_path){
  let process = spawn("cp",[ori_path,next_path]) ;
  process.on("exit",(code)=> {
    console.log("screenshot_move") ;
  }) ;
}

let insertion = function(file){
  let process = spawn("sed",["-i","","s/draw();/draw();shot();/g",file]) ;
  process.on("exit",(code)=> {
    console.log("draw()の直下にshot()を置いた") ;
  }) ;
}

let insertion_gif= function(file){
  let process = spawn("sed",["-i","","s/draw();/frameRate(50);shot_gif();draw(); /g",file]) ;
  let process2 = spawn("sed",["-i","","s/draw(){/draw(){frame(); /g",file]) ;
  process.on("exit",(code)=> {
    console.log("draw()の中にframe()を入れた") ;
  }) ;
}


let postProcess = function(path) {
  zip(DIR, path) ;
  ls() ;
  zip(DIR_COPY, path) ;
  rm() ;

  //静止画の場合
  //copy(DIR_shot,DIR_COPY + "/process");
  //insertion(Mainfile) ;

  //gifの場合
  copy(DIR_gifshot,DIR_COPY + "/process") ;
  insertion_gif(Mainfile) ;

  pj() ;
}
module.exports = postProcess ;
