const Discord = require("discord.js")
const db = require("quick.db")

//-------------------------------------------

module.exports = {
    name: "addcoins",
    aliases: ["ac"],
    category: "Economy",
    usage: "ac ",
    description: "shows you your current balance!",
    run: async (client, message, args) => {
  let prefix = await db.fetch(`prefix_${message.guild.id}`)
      if(prefix == null) {
          prefix = config.prefix
      }
      let user = message.mentions.members.first() || message.author;
      let owners = ["463967336194375701", "559420338052661258", "505606993034215434", "446495631075180564"]
      if(!message.author.id === owners ) return message.reply("you do not have perms to use this command, Only The Owner Of The Bot Have Access")
    
      if (isNaN(args[1])) return message.channel.send(`${message.author}, you need to input a valid number to remove.`)
      db.add(`coins_${user.id}`, args[1]) 
      let coins = await db.fetch(`coins_${user.id}`)
  
      let moneyEmbed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`<:white_check_mark:753232686310752331> Successfuly Added ${args[1]} coins To ${user}\n\nNew User's Balance: ${coins}`);
      message.channel.send(moneyEmbed)

    }
}