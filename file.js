let fs = require("fs") ;
let formidable = require("formidable") ;
const postProcess= require("./childprocess.js") ;

module.exports = function(req,res) {
      let form = new formidable.IncomingForm();
      form.parse(req, function(err, fields, files) {
        let oldpath = files.filetoupload.path ;
        let foldername = files.filetoupload.name ;
        let newpath = "./File_data/" + foldername ;
        fs.rename(oldpath, newpath, function(err){
          if(err) res.end(err) ;
          postProcess(newpath,foldername) ;
        });
      });
    }

function exist(data){
  let pr = new Promise(function(resolve, reject){
    console.log("data:"+data)
    fs.access("./File_data/"+data, function (err) {
      if (err) {
        if (err.code === 'ENOENT') {
          console.log('not exists!!');
        }
        else {
          console.error(err) ;
        }
        console.log("err") ;
        console.log("data2:"+data) ;
        resolve(data) ;
      }
      else {
        console.log('exists!!');
        data = "[latest]"+data ;
        console.log(data)
        resolve (data) ;
      }
    });
  });
  return pr;
}
