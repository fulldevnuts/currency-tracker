const { SlashCommandBuilder } = require("discord.js");
const { setUserBalance } = require("../database");

const set = new SlashCommandBuilder()
  .setName("set")
  .setDescription("Sets your balance to a specific amount")
  .addIntegerOption(option =>
    option
      .setName('amount')
      .setDescription('The amount to add')
      .setRequired(true)
  );

const handler = async (interaction) => {
  const amount = interaction.options.getInteger("amount");
  const user_id = interaction.user.id;
  try {
    await setUserBalance(user_id, amount);
    interaction.reply(`Your balance has been set to ${amount}`);
  } catch (err) {
    console.error(err);
  }
  
  return;
};

module.exports = {
  name: "set",
  command: set,
  handler: handler,
};