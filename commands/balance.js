const { SlashCommandBuilder } = require("discord.js");
const { addNewUser, getUserBalance } = require("../database");

const balance = new SlashCommandBuilder()
  .setName("balance")
  .setDescription("Shows your balance");

const handler = async (interaction) => {
  const user_id = interaction.user.id;
  try {
    const balance = await getUserBalance(user_id);
    if(isNaN(balance)) {
      balance = 0;
      await addNewUser(user_id);
    }
    interaction.reply(`Your balance is ${balance}`);
  } catch (err) {
    console.error(err);
  }
  
  return;
};

module.exports = {
  name: "balance",
  command: balance,
  handler: handler,
};