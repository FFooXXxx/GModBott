const Discord = require('discord.js');
const bot = new Discord.Client();
const express = require('express');
const app = express();
let token = 'NzMxOTAyNjEzODA4NzQyNDEy.Xwszzw.-AuqjM3BzDq57a_w49i_iSisYes';
let prefix = '*';

bot.on('ready', () => {
    console.log(`Let's make some kung-fu with ${bot.user.username}`);
    bot.generateInvite(["ADMINISTRATOR"]).then(link => {
        console.log(link);
    })

    bot.user.setActivity("WILYFOX");
});

app.get('/:name/:text', async (req, res) => {
    let name = req.params.name;
    let RawText = req.params.text;
    let text = RawText.replace('_', ' ').toString('utf8');
    
    let embed = new Discord.MessageEmbed()
        .setTitle(`GMOd Message`)
        .setColor(`#dcdcdc`)
        .addFields(
            { name: 'Username', value: name },
            { name: 'Text', value: text },
        )

    await bot.channels.fetch('781598931409829899').then(channel => {
        channel.send(embed);
    });
    
    console.log(name, text);
});

app.listen(process.env.PORT, () => {
    bot.login(token);
})
