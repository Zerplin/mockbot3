const Discord = require('discord.js');
const bot = new Discord.Client();

var mockList = [];
var userList = [];
var skip = 0;
var cooldown =1;
var timeout = 10;
const prefix = "!";
require('dotenv').config();

const DBL = require("dblapi.js");
const dbl = new DBL(process.env.apikey);

//talkedRecently = new Set();
talkedRecently = [];

var guildCooldown = [];
var guildList = [];

bot.on("ready", () => {
  console.log("Ready");
  userList = bot.users.array();
  bot.user.setActivity('!cmd|mocking '+userList.length+" users", { type: 'LISTENING' });

  /*
  dbl.hasVoted("165937223554826241").then(voted => {
    if (voted) console.log("Thank you for voting!")  
    else
    {
      console.log("did you know you can vote on me today?")
    }
  });
  */
})


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

  if (message.content.startsWith(prefix)&&message.guild != null) 
  {
    
    if (!message.author.bot) 
    {

      if(!talkedRecently.includes(message.channel.guild.id))
      {
        talkedRecently.push(message.channel.guild.id);
        talkedRecently[message.channel.guild.id]=[];
      }

      if (message.content.toLowerCase().includes("help") || message.content.toLowerCase().includes("command") || message.content.toLowerCase().includes("cmd")) 
      {
        message.channel.send("commands can be found here: https://discordbots.org/bot/605882759772241988 ᵖˡˢ ᵛᵒᵗᵉ");
        bot.user.setActivity('!cmd|mocking '+userList.length+" users", { type: 'LISTENING' });
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

      if(message.content.toLowerCase().startsWith("!mock cooldown"))
      {
        console.log("flg1 "+message.content);
        if(message.member.hasPermission("KICK_MEMBERS"))
        {
          console.log("flg2 :"+message.content.slice(15));
          var answer = parseInt(message.content.slice(15));
          if(Number.isInteger(answer))
          {
            //timeout = answer;
            message.channel.send("mock cooldown changed to "+ answer +" seconds");

            if(!guildCooldown.includes(message.channel.guild.id))
            {
              guildCooldown.push(message.channel.guild.id);
            }

            guildCooldown[message.channel.guild.id] = answer;

            if(!talkedRecently.includes(message.channel.guild.id))
            {
              talkedRecently.push(message.channel.guild.id);
              
            }

            talkedRecently[message.channel.guild.id] = [];
            /*
            console.log("before clear :"+talkedRecently);
            talkedRecently =new Set([]);
            console.log("after clear :"+talkedRecently);
            */
          }
          else
          {
            message.channel.send("invalid input");
            console.log("invalid input :"+answer);
          }
          
        }

        else
        {
          message.channel.send("Only administrators and moderators can change mock cooldown")
        }

        return(null);
      }

      //-----------------------------------------------------------------------------------------------------
      //if (talkedRecently.has(message.author.id) && cooldown==1 && message.content.startsWith("!mock"))
      //console.log("arr :"+talkedRecently[message.channel.guild.id]);
      if (talkedRecently[message.channel.guild.id].includes(message.author.id) && cooldown==1 && message.content.startsWith("!mock")) 
      {
        var minutes = Math.floor(guildCooldown[message.channel.guild.id]/60);
        var seconds = guildCooldown[message.channel.guild.id] - minutes*60
        message.author.send("Cooldown enabled, wait "+minutes+" minute(s) and "+seconds+ " second(s) before mocking again. - " + message.author)
        message.delete()
        .then(msg => console.log(`Deleted message from ${msg.author.username}`))
        .catch(console.error);

        console.log(talkedRecently);
      }
      
      else 
      {

        if(message.mentions.users.first())
        {
          if (message.content.toLowerCase().includes("mock") && !mockList.includes(message.mentions.users.first().id)) 
          {
            if (message.content.toLowerCase().includes(" all")) 
            {
              if(!message.mentions.users.first().bot)
              {
                dbl.hasVoted(message.author.id).then(voted => {
                  if (voted) 
                  {
                    message.channel.send("Thank you for voting!")  

                    mockList.push(message.mentions.users.first().id)

                    console.log("added " + mockList);
        
                    message.channel.send(mockingSpongebob("mocking " + message.mentions.users.first()))
        
                    skip = 1;
                  }
                  else if(!voted)
                  {
                    message.channel.send("unlock this command by voting here "+ "https://discordbots.org/bot/605882759772241988 "+"ᴵᵗ ᶜᵃⁿ ᵗᵃᵏᵉ ᵃ ᶠᵉʷ ᵐᶦⁿᵘᵗᵉˢ ᵗᵒ ᵘᵖᵈᵃᵗᵉ")
                  }
                });
              } 
              else
              {
                message.channel.send("sorry, I can't <mock all> a fellow bot");
              }

            }
            else 
            { 
              
              try{
                message.channel.send(mockingSpongebob(message.mentions.users.first().lastMessage.content));
                
              }catch(err)
              {
                message.channel.send("Error log: no message cached from mentioned user. Is this message from before I was added? Pls contact creator or join support server for further help")
              }
            
            }
          }
        }
        //--------------------------------------------------------------------------------------------------------
        else if (message.content.toLowerCase().includes("mock")) 
        {
          message.channel.fetchMessages({ limit: 2 }).then(msg => 
          {
            console.log("last msg " + msg.last().content);

            message.channel.send(mockingSpongebob(msg.last().content.toLowerCase()));

          });
        }
        
        if(guildCooldown.includes(message.channel.guild.id))
        {
          //console.log("guildcooldown : "+guildCooldown[message.channel.guild.id][0]);
          // Adds the user to the set so that they can't talk for a minute
          talkedRecently[message.channel.guild.id].push(message.author.id);
          setTimeout(() => 
          {
            // Removes the user from the set after a minute
            del = talkedRecently[message.channel.guild.id].indexOf(message.author.id)
            delete talkedRecently[message.channel.guild.id][del];
            //talkedRecently[message.channel.guild.id].delete(message.author.id);
          }, guildCooldown[message.channel.guild.id]*1000);

        }
      }
      
    }
  }
  //------------------------------------------------------------------------------------------------------------
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

//this is my spaghet, there are many like it, but this spaghet is mine 
