const channelId = '752375191853596702'
const check = '✅'
let registered = false

const registerEvent = (client) => {
  if (registered) {
    return
  }

  registered = true

  console.log('REGISTERING EVENTS')

  client.on('messageReactionAdd', (reaction, user) => {
    if (user.bot) {
      return
    }

    console.log('HANDLING REACTION')
    const { message } = reaction
    if (message.channel.id === channelId) {
      message.delete()
    }
  })
}

module.exports = {
  name: 'ticket',
  commands: ['ticket', 'support'],
  minArgs: 1,
  expectedArgs: '<message>',
  callback: (userMessage, arguments, text, client) => {
    const { guild, member } = userMessage

    registerEvent(client)

    const channel = guild.channels.cache.get(channelId)
    channel
      .send(
        `A new ticket has been creaated by <@${member.id}>
    
"${text}"
Click the ${check} icon when this issue has been resolved.`
      )
      .then((ticketMessage) => {
        ticketMessage.react(check)

        userMessage.reply(
          'Your ticket has been sent! Expect a reply within 24 hours.'
        )
      })
  },
}