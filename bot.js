
const Discord = require('discord.js');
const bot = new Discord.Client();
var rdy = 1;
var mockList = [];
require('dotenv').config();

/*
bot.on('message', (message)=> 
{
    if(message.content == 'noot'||message.content == 'Noot'||message.content == 'NOOT')
        message.channel.sendMessage("**NOOT**")
});
*/

function mockingSpongebob(text) 
{
    var res = "";
    var next = Math.floor(Math.random() * 3) + 1; // random number from [1,3]
    for(var i = 0; i < text.length; ++i) {
      if(i === next) {
        res += text.charAt(i).toUpperCase();
        next += Math.floor(Math.random() * 3) + 1; 
      } else {
        res += text.charAt(i);
      }
    }
    return res;
}
/*
channel.fetchMessages({ limit: 1 }).then(messages => {
    let lastMessage = messages.first();
  
    if (!lastMessage.author.bot) {
      // The author of the last message wasn't a bot
      message.channel.sendMessage(mockingSpongebob(message.content));
    }
  })

*/

bot.on('message', (message)=>
{

    if(message.mentions.users.first()&&!message.author.bot)
    {
        console.log("mention check");
        if(message.content.toLowerCase().includes("stop"))
        {
            console.log("before removal "+mockList);
            mockList = mockList.filter(user => user!=message.mentions.users.first().id);
            //mockList.pop();
            //mockList. mockList.indexOf(message.mentions.users.first().id)
            console.log("to be removed "+message.mentions.users.first().id);
            console.log("removed "+mockList);
        }

        else if(message.content.toLowerCase().includes("mock"))
        {
            mockList.push(message.mentions.users.first().id)

            console.log("added "+mockList);
        }
        
    }
    
    if(!message.author.bot && mockList.includes(message.author.id))
    {
        message.channel.send(mockingSpongebob(message.content.toLowerCase()));
    }
    
});


bot.login(process.env.token);

console.log("check");
//console.log(process.env.token);




