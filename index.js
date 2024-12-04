const { Client, Events, GatewayIntentBits, SlashCommandBuilder } = require("discord.js");

require("dotenv").config()
const DISCORD_SERVER_ID = process.env.DISCORD_SERVER_ID;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, readyClient => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);

  const ping = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!");

  client.application.commands.create(ping, DISCORD_SERVER_ID);
});

client.on(Events.InteractionCreate, interaction => {
  console.log(interaction);
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    interaction.reply("Pong!");
    return;
  }

});

client.login(process.env.DISCORD_BOT_TOKEN);