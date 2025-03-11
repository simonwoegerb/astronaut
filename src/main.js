require('dotenv').config();
const { Client, Events, GatewayIntentBits, Partials } = require('discord.js');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.Guilds],
    partials: [Partials.Message, Partials.MessageContent, Partials.MessageCreate, Partials.Channel, Partials.User] });


// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.on(Events.MessageCreate, async (message) => {
    console.log('Test');
    if (message.author.bot) return; // Ignore bot messages

    if (message.content.startsWith('!send')) {
        const args = message.content.split(' ').slice(1);
        const msgToSend = args.join(' ');
        if (!msgToSend) {
            return message.reply('Please provide a message to send.');
        }
        const channel = message.channel;
        return message.delete().then(channel.send(msgToSend));
    }
});
client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Log in to Discord with your client's token
client.login(process.env.KEY);
