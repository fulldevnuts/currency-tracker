const { SlashCommandBuilder } = require("discord.js");
const { addAmountToUserBalance, addNewUser, getUserBalance } = require("../database");

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
  const amount = interaction.options.getInteger("amount");
  const isAdmin = interaction.member.permissions.has(process.env.ADMIN_PERMISSION);
  if(!isAdmin) {
    await interaction.editReply("You are not authorized to use this command");
    return;
  }
  const user = interaction.options.getUser("user");
  try {
    const balance = await getUserBalance(user.id);
    if(isNaN(balance)) {
      balance = 0;
      await addNewUser(user.id);
    }
    await addAmountToUserBalance(user.id, amount);
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