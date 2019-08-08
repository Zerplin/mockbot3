const Discord = require('discord.js');
const bot = new Discord.Client();
var rdy = 1;
var mockList = [];
var skip = 0;
const prefix ="!";
require('dotenv').config();


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


bot.on('message', (message)=>
{

  if(message.content.startsWith(prefix))
  {

    if(message.mentions.users.first()&&!message.author.bot)
    {
        console.log("mention check");
        if(message.content.toLowerCase().includes("stop"))
        {
            console.log("before removal "+mockList);
            
            mockList = mockList.filter(user => user!=message.mentions.users.first().id);

            console.log("to be removed "+message.mentions.users.first().id);
            console.log("removed "+mockList);

            skip=1;
        }

        else if(message.content.toLowerCase().includes("mock")&&!mockList.includes(message.mentions.users.first().id))
        {
          if(message.content.toLowerCase().includes(" all"))
          {

            mockList.push(message.mentions.users.first().id)

            console.log("added "+mockList);

            message.channel.send(mockingSpongebob("mocking "+message.mentions.users.first()))
          
            skip=1;

          }

          else
          {
            message.channel.send(mockingSpongebob(message.mentions.users.first().lastMessage.content));
          }

        }
        
    }

    else if(message.content.toLowerCase().includes("mock")&&!message.author.bot)
    {
      message.channel.fetchMessages({ limit: 2 }).then(msg=> 
        {
          console.log("last msg "+msg.last().content);

          message.channel.send(mockingSpongebob(msg.last().content.toLowerCase()));

        });
    }
    
  }

    if(!message.author.bot && mockList.includes(message.author.id)&&skip==0)
    {
        message.channel.send(mockingSpongebob(message.content.toLowerCase()));
    }
    
    if(skip==1)
    {
      skip = 0;
    }
  
});

bot.login(process.env.token);

console.log("check");




