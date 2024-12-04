const { Client, Events, GatewayIntentBits, SlashCommandBuilder } = require("discord.js");

require("dotenv").config()
const DISCORD_SERVER_ID = process.env.DISCORD_SERVER_ID;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, readyClient => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);

  const ping = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!");

  const add = new SlashCommandBuilder()
    .setName("add")
    .setDescription("Adds an amount to your balance")
    .addIntegerOption(option =>
      option
        .setName('amount')
        .setDescription('The amount to add')
        .setRequired(true)
    );

  client.application.commands.create(ping, DISCORD_SERVER_ID);
  client.application.commands.create(add, DISCORD_SERVER_ID);
});

client.on(Events.InteractionCreate, interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    interaction.reply("Pong!");
    return;
  }

  if (interaction.commandName === "add") {
    const amount = interaction.options.getInteger("amount");
    interaction.reply(`${amount} addedd to your balance!`);
    return;
  }

});

client.login(process.env.DISCORD_BOT_TOKEN);