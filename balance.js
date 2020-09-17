const Discord = require("discord.js")
const db = require("quick.db")
const config = require("../../config.json")

module.exports = {
  name: "balance",
  aliases: ["bal"],
  category: "Economy",
  usage: "bal",
  description: "shows you your current balance!",
  run: async (client, message, args) => {
let prefix = await db.fetch(`prefix_${message.guild.id}`)
    if(prefix == null) {
        prefix = config.prefix
    }
    
    let user = message.mentions.members.first() || message.author;
    let coins = db.get(`coins_${message.author}`)
   
    if(!user) {
      let embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle("Balance Command")
      .setDescription(`You have ${coins} Coin(s) in your pocket!`)
      .setFooter("Balance Command")
      message.channel.send(embed)
      } else {
        let embed2 = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle("Balance Command")
        .setDescription(`${user} Has ${coins} Coin(s) in his balance!!`)
        .setFooter("Balance Command")
        message.channel.send(embed2)
    }


  }
}

/*if(!user) {
let embed = new Discord.MessageEmbed()
.setColor('RANDOM')
.setTitle("Balance Command")
.setDescription(`You have ${coins} Coin(s) in your pocket!`)
.setFooter("Balance Command")
message.channel.send(embed)
} else {
  let embed2 = new Discord.MessageEmbed()
  .setColor('RANDOM')
  .setTitle("Balance Command")
  .setDescription(`${user} Has ${coins} Coin(s) in his balance!!`)
  .setFooter("Balance Command")
  message.channel.send(embed2)*/

 /*var balance = new db.table('balance')
  let walletmoney = balance.set('walletmoney', 500) // -> 500
  balance.get('wallet') // -> 500
  let bankmoney = balance.set('bankmoney', 1000)
  db.get('myBalance') */

  //let walletmoney = db.get(walletmoney)
  //let bankmoney = db.get(bankmoney)


  /*if(!user) {
    let embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle(`${message.author.user.username}'s balance`)
    .addField(`Wallet - ${walletmoney}`)
    .addField(` Bank - ${bankmoney}`)
    .setFooter(`${message.author.user.username}'s balance`)
    message.channel.send(embed)*/