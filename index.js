const Discord = require("discord.js");
const db = require("quick.db")
const client = new Discord.Client();
const { prefix, token } = require('./config.json')
const fs = require('fs');

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client)
})

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', async () => {
    
    client.user.setPresence({ status: 'online' });
    const activities_list = [
     `with ${client.users.cache.size} users`, 
     "Lots of fun commands",
     " 24/7", 
     `in ${client.guilds.cache.size} servers`
      ]; // creates an arraylist containing phrases you want your bot to switch through.
      setInterval(() => {
          const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
          client.user.setActivity(activities_list[index]); // sets bot's activities to one of the phrases in the arraylist.
      }, 10000); // Runs this every 10 seconds.});
  
    console.log('Miro is online!');
});

client.on("message", async message => {

    let prefix;
  let prefixes = db.fetch(`prefix_${message.guild.id}`);

  if (prefixes == null) {
      prefix = '='
      db.set(`prefix_${message.guild.id}`, "=");
  } else {
      prefix = prefixes;
  }
 
 
  if (message.content.includes(client.user.id)) 
  if (message.args [0]){
    message.channel.send(`my prefix for this server is ${prefix}`)
}
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;
  if (!message.member) message.member = await message.guild.fetchMember(message);



  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  
  if (cmd.length === 0) return;
  
  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) 
      command.run(client, message, args)
})
//NzUyMjMwNzA2NTQwODM5MDEy.X1UncA.HACArbR8x4QBSme7WjHg3IRj8L0
client.login('NzUyMjMwNzA2NTQwODM5MDEy.X1UncA.HACArbR8x4QBSme7WjHg3IRj8L0');
