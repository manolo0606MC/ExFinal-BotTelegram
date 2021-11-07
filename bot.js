const { Telegraf } = require("telegraf");
require('dotenv').config();
const axios = require("axios");

const bot = new Telegraf(process.env.BOT_TOKEN_TELEGRAM);

bot.start((ctx) => {
    ctx.reply("Bienvenido al mejor Bot de Telegram");
});

bot.command('bot_id', (ctx) => {
    ctx.reply(ctx.chat.id);
});

bot.command('mis_cursos', (ctx) => {
    let bot_id = ctx.chat.id;

    axios.post('http://localhost:3000/api/student/mycourses_bot', {
        bot_id: bot_id
    })
        .then((response) => {
            if (response.data.data.length > 0) {
                response.data.data.forEach(element => {
                    ctx.reply(element.informacion);
                });
            }else{
                ctx.reply("No hay información para mostrar");
            }
        })
        .catch((error) => {
            console.log(error);
        });


});

bot.hears(/curso (.+)/i, (ctx) => {

    let query = ctx.message.text.trim();
    try {
        query = query.split("").slice(("curso ").split("").length).join("");
    } catch (err) {
        console.log(err)
    }

    console.log(query)

    axios.post('http://localhost:3000/api/student/mycourses_bot', {

    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

})


bot.launch();