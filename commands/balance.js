const { SlashCommandBuilder } = require("discord.js");
const { addNewEntry, getUserBalance } = require("../database");

const balance = new SlashCommandBuilder()
  .setName("balance")
  .setDescription("Shows your balance");

const handler = async (interaction) => {
  await interaction.deferReply({ ephemeral: true });
  const user_id = interaction.user.id;
  const channel_id = interaction.channelId;
  try {
    const balance = await getUserBalance(user_id, channel_id);
    if(isNaN(balance)) {
      balance = 0;
      await addNewEntry(user_id, channel_id);
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