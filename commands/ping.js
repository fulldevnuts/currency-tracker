const { SlashCommandBuilder } = require("discord.js");

const ping = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with Pong!");

const handler = async (interaction) => {
  interaction.reply("Pong!");
  return;
};

module.exports = {
  name: "ping",
  command: ping,
  handler: handler,
};