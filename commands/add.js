const { SlashCommandBuilder } = require("discord.js");
const { addNewUser, getUserBalance, addAmountToUserBalance } = require("../database");

const add = new SlashCommandBuilder()
  .setName("add")
  .setDescription("Adds an amount to your balance")
  .addIntegerOption(option =>
    option
      .setName('amount')
      .setDescription('The amount to add')
      .setRequired(true)
  );

const handler = async (interaction) => {
  await interaction.deferReply({ ephemeral: true });
  const amount = interaction.options.getInteger("amount");
  const user_id = interaction.user.id;
  try {
    const balance = await getUserBalance(user_id);
    if(isNaN(balance)) {
      balance = 0;
      await addNewUser(user_id);
    }
    await addAmountToUserBalance(user_id, amount);
    await interaction.editReply(`${amount} has been added to your balance! New total is ${balance+amount}`);
  } catch (err) {
    console.error(err);
    await interaction.editReply("Failed to add amount to user's balance");
  }
  
  return;
};

module.exports = {
  name: "add",
  command: add,
  handler: handler,
};