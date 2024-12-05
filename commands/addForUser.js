const { SlashCommandBuilder } = require("discord.js");
const { addAmountToUserBalance, getUserBalance, addNewEntry } = require("../database");

const addForUser = new SlashCommandBuilder()
  .setName("add-for-user")
  .setDescription("Adds an amount to a user's balance")
  .addUserOption(option =>
    option
      .setName('user')
      .setDescription('The user to add the amount to')
      .setRequired(true)
    )
  .addIntegerOption(option =>
    option
      .setName("amount")
      .setDescription("The amount to add")
      .setRequired(true)
  );

const handler = async (interaction) => {
  await interaction.deferReply({ ephemeral: true });
  const isAdmin = interaction.member.permissions.has(process.env.ADMIN_PERMISSION);
  if(!isAdmin) {
    await interaction.editReply("You are not authorized to use this command");
    return;
  }
  const amount = interaction.options.getInteger("amount");
  const user = interaction.options.getUser("user");
  const channel_id = interaction.channelId;
  try {
    let balance = await getUserBalance(user.id, channel_id);
    if(isNaN(balance)) {
      balance = 0;
      await addNewEntry(user.id, channel_id);
    }
    await addAmountToUserBalance(user.id, channel_id, amount);
    await interaction.editReply(`${amount} has been added to ${user.username}'s balance! New total is ${balance+amount}`)
  } catch (err) {
    console.error(err);
    await interaction.editReply("Failed to update user's balance");
  }
  
  return;
};

module.exports = {
  name: "add-for-user",
  command: addForUser,
  handler: handler,
};