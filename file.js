let fs = require("fs");
let formidable = require("formidable") ;
const postProcess= require("./childprocess.js");


module.exports = function(req,res) {
      let form = new formidable.IncomingForm();
      form.parse(req, function(err, fields, files) {
        let oldpath = files.filetoupload.path ;
        let newpath = "./File_data/" + files.filetoupload.name ;
        fs.rename(oldpath, newpath, function(err){
          if(err) res.end(err) ;
          postProcess(newpath) ;
        });
      });
    }
