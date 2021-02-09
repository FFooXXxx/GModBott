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
    let info = req.body.inf;
    console.log();

    let embed = new Discord.MessageEmbed()
        .setTitle(`GM0d Message 0.1`)
        .setColor(`#dcdcdc`)
        .addFields(
            { name: 'Username', value: name },
            { name: 'Text', value: '```' + text + '```' },
            { name: 'Debug', value: '```' + info + '```' }
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
