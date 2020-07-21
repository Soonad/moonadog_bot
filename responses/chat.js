const get_name = (ctx) => {
  try {
    // console.log(ctx.update);
    return ctx.update.message.from.first_name;
  } catch(e){
    return "friend";
  }
}

const start_msg = (ctx) => `
Hello, ${get_name(ctx)}, I'm your Moonad assistant!

You can call me in any chat by typing @moonadog_bot followed by a Formality term which you wish to send the body/code.

I can also provide you some cool information (WIP).
Type /help to check the commands. These commands can be invoked in any chat I'm a member. Just invite me to wherever you want, I'm a good boy.
`

/* TODO: 
- add hear about Victor Maia and Jonh Burnham?
- add jokes?
- add random and simples tips about Formality
*/

module.exports = (bot) => {
  bot.start((ctx) => ctx.reply(start_msg(ctx)));
}