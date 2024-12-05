const { SlashCommandBuilder } = require("discord.js");
const { setUserBalance } = require("../database");

const set = new SlashCommandBuilder()
  .setName("set")
  .setDescription("Sets your balance to a specific amount")
  .addIntegerOption(option =>
    option
      .setName("balance")
      .setDescription("The new balance")
      .setRequired(true)
  );

const handler = async (interaction) => {
  await interaction.deferReply({ ephemeral: true });
  const balance = interaction.options.getInteger("balance");
  const user_id = interaction.user.id;
  try {
    await setUserBalance(user_id, balance);
    await interaction.editReply(`Your balance has been set to ${balance}`);
  } catch (err) {
    console.error(err);
    await interaction.editReply("Failed to set the new balance");
  }
  
  return;
};

module.exports = {
  name: "set",
  command: set,
  handler: handler,
};