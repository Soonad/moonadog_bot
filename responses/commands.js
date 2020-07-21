const fetch = require('node-fetch');
const {qtd_terms} = require('../moonad_info');

const fm_package_URL =  "https://raw.githubusercontent.com/moonad/Formality/master/javascript/package.json";

// Response
var fm_version = "ops, an error ocurred";
var provit_res = "Go to [Provit - sample](http://moonad.org:8080/)"

/*
TODO: beginner guide:
- Useful links to the documentation
- Resourses: link to books, videos and posts
- FAQ: link to the FAQ 
Add tutorials like on: https://github.com/Soonad/docs.formality-lang.org/tree/master/docs/source/tutorials
*/
const beginner_guide = `
Here are some usefull links to help you get started: 
- [Introduction to Formality](https://github.com/moonad/Formality/blob/master/README.md)
- [Theorem proving](https://github.com/moonad/Formality/blob/master/THEOREM_PROVING_TUTORIAL.md)
`

const moonad_res = `
Moonad is the beginning of a long-term project aiming to build an entire operating system built on top of type-theory. In the short term, it serves as a big collection of Formality structures, algorithms, proofs and apps.

- [moonad.org](http://moonad.org/)
- Follow on [Github](https://github.com/Moonad/moonad)
`

// Can have problems due to Github limits
async function get_fm_version() {
  try {
   var version = await fetch(fm_package_URL, { 
      method: 'GET',
      headers: { 'User-Agent': 'mymoobot' }
    })
    .then(res => res.json())
    .then(res => res.version)
    .catch(e => console.log(e))
    fm_version = version;
  } catch (e){
    return "an error occurred while fetching this information";
  }
}

// Fetch
get_fm_version();

/* Telegram commands
fm_version - npm formality-lang version
moonad - Access Moonad interface
provit - Access Provit example (sketch)
beginners_guide - Useful resources to start learning Formality
qtd_terms - Get the actual quantity of Formality terms
*/
module.exports = (bot) => {
  bot.hears('/fm_version', (ctx) => ctx.reply("npm formality-lang version: "+fm_version));
  bot.hears('/moonad', (ctx) => ctx.replyWithMarkdown(moonad_res));
  bot.hears('/provit', (ctx) => ctx.replyWithMarkdown(provit_res));
  bot.hears("/beginners_guide", (ctx => ctx.replyWithMarkdown(beginner_guide)));
  bot.hears("/qtd_terms", (ctx => ctx.replyWithMarkdown(qtd_terms ? 
    "We have "+qtd_terms+" .fm files!" : "something went wrong with the request")));
  bot.help(async (ctx) => {
    const commands = await ctx.getMyCommands();
    const info = commands.reduce((acc, val) => `${acc}/${val.command} - ${val.description}\n`, '');
  return ctx.reply(info)
})
}