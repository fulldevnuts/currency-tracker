const { SlashCommandBuilder } = require("discord.js");
const { addNewUser, getUserBalance } = require("../database");

const balance = new SlashCommandBuilder()
  .setName("balance")
  .setDescription("Shows your balance");

const handler = async (interaction) => {
  await interaction.deferReply({ ephemeral: true });
  const user_id = interaction.user.id;
  try {
    const balance = await getUserBalance(user_id);
    if(isNaN(balance)) {
      balance = 0;
      await addNewUser(user_id);
    }
    await interaction.editReply(`Your balance is ${balance}`);
  } catch (err) {
    console.error(err);
    await interaction.editReply("Failed to retrive your balance");
  }
  
  return;
};

module.exports = {
  name: "balance",
  command: balance,
  handler: handler,
};