
const { MessageEmbed } = require("discord.js");
const { promptMessage } = require("../../functions.js");


const chooseArr = ["🗻", "📰", "✂"];

module.exports = {
    name: "rps",
    category: "fun",
    description: "Rock Paper Scissors game. React to one of the emojis to play the game.",
    usage: "rps",
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setTitle('React with one of these to play!')
            .setColor("#ffffff")
            .setFooter('')
            .setDescription("")
            .addFields(
                { name: '=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-', value: '\u200B'},
                { name: '🗻 | Rock', value: '\u200B'},
                { name: '📰 | Paper', value: '\u200B'},
                { name: '✂ | Scissors', value: '\u200B'},
                { name: '=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-', value: '\u200B'}
            )
            .setTimestamp();

        const m = await message.channel.send(embed);
        const reacted = await promptMessage(m, message.author, 30, chooseArr);

        const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];

        const result = await getResult(reacted, botChoice);
        await message.reactions.removeAll();

        embed
            .setDescription("")
            .addField(result, `${reacted} vs ${botChoice}`);

        m.edit(embed);

        function getResult(me, clientChosen) {
            if ((me === "🗻" && clientChosen === "✂") ||
                (me === "📰" && clientChosen === "🗻") ||
                (me === "✂" && clientChosen === "📰")) {
                    return "You won!";
            } else if (me === clientChosen) {
                return "It's a tie!";
            } else {
                return "You lost!";
            }
        }
    }
}