const {spawn} = require("child_process") ;
const file = require("./file.js") ;
let fs = require("fs");
const DIR = "./File_data" ;
const DIR_COPY = "./File_data_copy" ;
const DIR_Absolute = "/Users/motegiyuta/Desktop/interface/File_data_copy" ;
const DIR_gifshot = "./processing/screenshot_gif/screenshot_gif.pde" ;
const DIR_shot = "./processing/screenshot_image/screenshot_image.pde" ;
const DIR_save = "/Users/motegiyuta/Desktop/save/" ;
//送信されてきたzipファイルの名前を取得する
//folder_name_zipはzipファイル
//folder_nameはzipを取り除いた
let zip_name_remove = function(folder_name_zip){
  let targetStr = ".zip" ;
  let regExp = new RegExp( targetStr, "g" ) ;
  let folder_name = folder_name_zip.replace( regExp , "" ) ;
  return folder_name ;
} ;

//folder内のフォルダにscreenshotファイルの挿入とpjをしていく
let folder_in_file = function(folder_name_zip){
  let folder_name = zip_name_remove(folder_name_zip) ;
  fs.readdir(DIR_COPY+"/"+folder_name, (err, files) => {

    for(let i=0 ; i<files.length ;i++){
      //gif
      copy(DIR_gifshot,DIR_COPY + "/"+folder_name+"/"+files[i] ) ;
      //写真
      //copy(DIR_shot,DIR_COPY + "/"+folder_name+"/"+files[i] ) ;
    }
    for(let i=0 ; i<files.length ;i++){
      //gif
      insertion_gif(DIR_COPY + "/"+folder_name+"/"+files[i]+"/"+files[i]+".pde") ;
      //写真
      //insertion(DIR_COPY + "/"+folder_name+"/"+files[i]+"/"+files[i]+".pde") ;
    }
    for(let i=0 ; i<files.length ;i++){
      pj(DIR_Absolute+"/"+folder_name+"/"+files[i]) ;
    }
  }) ;
} ;

let zip = function(dir, path){
  console.log("path_zip"+path) ;
  let process = spawn("unzip",["-o",path,"-d",dir]) ;
  process.on('exit', (code) => {
    console.log("thawing");
  }) ;
} ;

let pj = function(path) {
  let process = spawn("processing-java", ["--sketch=" + path  ,"--run" ]) ;
  process.on("exit", (code) => {
    console.log("processing finish!") ;
  }) ;
} ;

let rm = function(folder_name_zip){
  let folder_name = zip_name_remove(folder_name_zip) ;
  let process = spawn("rm",["-r",DIR+"/__MACOSX"]) ;
  let process2 = spawn("rm",["-r",DIR_COPY+"/__MACOSX"]) ;
  let process3 = spawn("rm",["-r",DIR+"/"+folder_name+"/.DS_Store"]) ;
  let process4 = spawn("rm",["-r",DIR_COPY+"/"+folder_name+"/.DS_Store"]) ;
  process.on("exit", (code) => {
    console.log("remove:__MACOSX");
  }) ;
} ;

let copy = function(ori_path,next_path){
  let process = spawn("cp",[ori_path,next_path]) ;
  process.on("exit",(code)=> {
    console.log("screenshot_move") ;
  }) ;
} ;

let insertion = function(file){
  let process = spawn("sed",["-i","","s/draw();/draw();shot();exit();/g",file]) ;
  process.on("exit",(code)=> {
    console.log("draw()の直下にshot()を置いた") ;
  }) ;
} ;

let insertion_gif= function(file){
  let process = spawn("sed",["-i","","s/draw();/frameRate(50);shot_gif();draw(); /g",file]) ;
  let process2 = spawn("sed",["-i","","s/draw(){/draw(){frame(); /g",file]) ;
  process.on("exit",(code)=> {
    console.log("draw()の中にframe()を入れた") ;
  }) ;
} ;

let DS_Store_delete = function(){
  let process = spawn("find",[".","-name",".DS_Store","-delete"]);
}
let MACOSX_delete = function(path){
  let precess = spawn("rm",["-R",path+"/__MACOSX",]);
}

let postProcess = function(path,folder_name_zip) {
  console.log("postprocess_path"+path)
  zip(DIR, path) ;
  zip(DIR_COPY, path) ;
  DS_Store_delete() ;
  MACOSX_delete(DIR) ;
  MACOSX_delete(DIR_COPY) ;
  folder_in_file(folder_name_zip);
} ;
module.exports = postProcess ;
