const Discord = require('discord.js');
const bot = new Discord.Client();

var rdy = 1;
var mockList = [];
var skip = 0;
const prefix = "!";
require('dotenv').config();

//const DBL = require("dblapi.js");
//const dbl = new DBL('process.env.token', bot);
/*
bot.on("ready", () => {
  console.log("Ready");
  bot.user.setActivity('!cmd', { type: 'LISTENING' });
})
*/

function mockingSpongebob(text) {
  var res = "";
  var next = Math.floor(Math.random() * 3) + 1; // random number from [1,3]
  for (var i = 0; i < text.length; ++i) {
    if (i === next) {
      res += text.charAt(i).toUpperCase();
      next += Math.floor(Math.random() * 3) + 1;
    } else {
      res += text.charAt(i);
    }
  }
  return res;
}


bot.on('message', (message) => 
{

  if (message.content.startsWith(prefix)) 
  {

    if (!message.author.bot) 
    {

      if (message.content.toLowerCase().includes("help") || message.content.toLowerCase().includes("command") || message.content.toLowerCase().includes("cmd")) 
      {
        message.channel.send("commands can be found here: https://discordbots.org/bot/605882759772241988 ᵖˡˢ ᵛᵒᵗᵉ");
      }
  
      if (message.content.toLowerCase().includes("getserver")) 
      {
        message.channel.send("i am in " + bot.guilds.size + " servers");
      }
    //----------------------------------------------------------------------------------------------------------------------------------------

      if (message.content.toLowerCase().includes("stop") || message.content.toLowerCase().includes("unmock")) 
      {

        if (message.mentions.users.first()) 
        {
          console.log("mention check: " + message.mentions.users.first());

          console.log("before removal " + mockList);

          mockList = mockList.filter(user => user != message.mentions.users.first().id);

          console.log("to be removed " + message.mentions.users.first().id);
          console.log("removed " + mockList);

          message.channel.send(mockingSpongebob("unmocking " + message.mentions.users.first()));

          skip = 1;
        }

        else 
        {
          console.log("author check: " + message.author);

          console.log("before removal " + mockList);

          mockList = mockList.filter(user => user != message.author.id);

          console.log("to be removed " + message.author.id);
          console.log("removed " + mockList);

          message.channel.send(mockingSpongebob("unmocking " + message.author));
        }
      }

      //-----------------------------------------------------------------------------------------------------
      else if(message.mentions.users.first())
      {
        if (message.content.toLowerCase().includes("mock") && !mockList.includes(message.mentions.users.first().id)) 
        {
          if (message.content.toLowerCase().includes(" all")) 
          {

            mockList.push(message.mentions.users.first().id)

            console.log("added " + mockList);

            message.channel.send(mockingSpongebob("mocking " + message.mentions.users.first()))

            skip = 1;

          }

          else 
          {
            message.channel.send(mockingSpongebob(message.mentions.users.first().lastMessage.content));
          }

        }
      }

      else if (message.content.toLowerCase().includes("mock")) 
      {
        message.channel.fetchMessages({ limit: 2 }).then(msg => 
        {
          console.log("last msg " + msg.last().content);

          message.channel.send(mockingSpongebob(msg.last().content.toLowerCase()));

        });
      }


    }
  }

  if(mockList.includes(message.author.id) && skip == 0) 
  {
    message.channel.send(mockingSpongebob(message.content.toLowerCase()));
  }

  if (skip == 1) 
  {
    skip = 0;
  }

});

bot.login(process.env.token);

console.log("check");





