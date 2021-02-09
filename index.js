const Discord = require('discord.js');
const bot = new Discord.Client();
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const request = require('request');
const urlencodedParser = bodyParser.urlencoded({extended: true});
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
    let steam64 = req.body.ssf;
    let avatarurl = '';
    
    let type = '';

    let content = text.split(' ');
    if (content[0] == '//' || content == '/ooc') {
        text = text.replace(content[0], '').trim();
        type = 'ooc';
    } else if (content[0] == '/l' || content == '/looc') {
        text = text.replace(content[0], '').trim();
        type = 'looc';
    } else if (content[0] == '/pm') {
        text = text.replace(content[0], '').trim();
        type = 'pm';
    } else if (content[0].startsWith('/')) {
        text = text.replace(content[0], '').trim();
        type = content[0].replace('/', '');
    } else {
        type = 'message'
    }

    request(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAMAPITOKEN}&steamids=${steam64}`, async (err, res, body) => {
        avatarurl = JSON.parse(String(body)).response.players[0].avatar;

        let embed = new Discord.MessageEmbed()
            .setTitle(`${name} (${steamid})`)
            .setColor(`#dcdcdc`)
            .addFields(
                { name: 'Тип сообщения', value: type },
                { name: 'Содержание', value: '```' + text.trim() + '```' },
                { name: 'URL', value: avatarurl },
            )
            .setAuthor(name, avatarurl)

        await bot.channels.fetch('781598931409829899').then(channel => {
            channel.send(embed);
        });
    });
    
    res.end();  
});

app.listen(process.env.PORT, () => {
    bot.login(process.env.TOKEN);
})
