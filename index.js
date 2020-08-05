require('dotenv').config();
const Telegraf = require('telegraf')

const commands = require('./responses/commands');
const inline_query = require("./responses/inline_query");
const chat = require('./responses/chat');

const bot = new Telegraf(process.env.TOKEN);
/*
Description: Easily get Formality library's code and information about Moonad and Formality.
*/

console.log("Moonadog read to listen from Telegram");
chat(bot);
commands(bot);
inline_query(bot);

bot.launch();