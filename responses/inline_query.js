const {files_info} = require('../moonad_info');

async function get_fm_file_content(name) {
  var file_content = (code) => "<pre>"+code+"</pre>"
  return file_content(name);
}

const url_link = (url, name) => {
  return `Go to the file source: [${name}](${url})`
}

const code = (term) => {
  if (term.code === "") {
    return "There's a lot of code in here. "+url_link(term.html_url, term.name);
  } else {
    return "`"+term.code+"`";
  }
}

module.exports = (bot) => {
  bot.on('inline_query', async ({ inlineQuery, answerInlineQuery }) => {
    var filtered_terms = files_info.filter(term => {
      return term.name.toLowerCase().startsWith(inlineQuery.query.toLowerCase())
    }); 
  
    var display = [];
    if (filtered_terms.length === 0){
      display = [{
          type: 'article',
          id: 0,
          title: "Search for a Formality term",
          description: "Try something like Bool, List",
          input_message_content: {
            message_text: url_link("https://github.com/moonad/Moonad/blob/master/lib", "Formality lib"),
            parse_mode: 'markdown',
            disable_web_page_preview: true
          },
          hide_url: true,
          url: 'https://github.com/moonad/Moonad/blob/master/lib'
        }]
    } else {
      var display_raw = filtered_terms.map(info => {
        return {
          type: 'article',
          id: info.id,
          title: "moonad/lib/",
          description: info.name,
          input_message_content: {
            message_text: code(info),
            parse_mode: 'markdown',
            disable_web_page_preview: true
          },
          hide_url: true,
          url: info.html_url
        }
      });
      display = display_raw.length > 20 ? display_raw.slice(0, 19) : display_raw;
    }
    
    answerInlineQuery(display)
  });
}