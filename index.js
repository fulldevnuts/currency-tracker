require("dotenv").config()
const DISCORD_SERVER_ID = process.env.DISCORD_SERVER_ID;

const { Client, Events, GatewayIntentBits } = require("discord.js");
const { commands, handlers } = require("./commands");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, readyClient => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);

  commands.forEach(command => {
    client.application.commands.create(command.command, DISCORD_SERVER_ID);
  });
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName in handlers) {
    try {
      await handlers[interaction.commandName](interaction);
    } catch (err) {
      console.error(err);
    }
    return;
  }

});

client.login(process.env.DISCORD_BOT_TOKEN);