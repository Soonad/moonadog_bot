const fs = require("fs");
var path = require("path");

const lib_short_path = '../lib/';

function get_files_info() {
  var info = [];
  var i = 0;
  var lib_path = path.join(__dirname, lib_short_path);
  fs.readdirSync(lib_path).forEach(file_name => {
    if(file_name.endsWith(".fm")){
      var content = read_content(file_name);
      var entry = format_info(file_name, content, i);
      info.push(entry);
      i++;
    }
  });
  return info;
}

function format_info(file_name, content, id) {
  return { 
    "name": file_name,
    "id": id, 
    "html_url": "https://github.com/moonad/Moonad/blob/master/lib/"+file_name,
    "size": content.length,
    "code": content.length <= 400 ? content : ""
  }
}

function read_content(file_name) {
  var content = "";
  try {
    var lib_path = path.join(__dirname, lib_short_path);
    content = fs.readFileSync(lib_path+file_name, "utf-8");
  } catch(e) {
    console.log("Read lib content error: ", e);
  }
  return content;
}

var files_info = get_files_info();
var qtd_terms = files_info.length;

module.exports = {files_info, qtd_terms};


