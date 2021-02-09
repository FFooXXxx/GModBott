const Discord = require('discord.js');
const bot = new Discord.Client();
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: true});
let token = 'NzMxOTAyNjEzODA4NzQyNDEy.Xwszzw.-AuqjM3BzDq57a_w49i_iSisYes';
let prefix = '*';

bot.on('ready', () => {
    console.log(`Let's make some kung-fu with ${bot.user.username}`);
    bot.generateInvite(["ADMINISTRATOR"]).then(link => {
        console.log(link);
    })

    bot.user.setActivity("WILYFOX");
});

app.post('/', urlencodedParser, async (req, res) => {
    let name = req.body.name;
    let text = req.body.text;
    let steamid = req.body.steamid;
    let type = '';

    let content = text.split(' ');
    if (content[0] == '//' || content == '/ooc') {
        text = text.replace(content[0], '');
        type = 'ooc';
    } else if (content[0] == '/l' || content == '/looc') {
        text = text.replace(content[0], '');
        type = 'looc';
    } else if (content[0] == '/pm') {
        text = text.replace(content[0], '');
        type = 'pm';
    } else if (content[0].startsWith('/')) {
        text = text.replace(content[0], '');
        type = content[0].replace('/', '');
    } else {
        type = 'message'
    }

    let embed = new Discord.MessageEmbed()
        .setTitle(`${name} | ${steamid}`)
        .setColor(`#dcdcdc`)
        .addFields(
            { name: 'Тип сообщения', value: type },
            { name: 'Содержание', value: '```' + text + '```' },
        )

    await bot.channels.fetch('781598931409829899').then(channel => {
        channel.send(embed);
    });
    
    console.log(name, text);
    res.end();
});

app.listen(process.env.PORT, () => {
    bot.login(token);
})
