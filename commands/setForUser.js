const { SlashCommandBuilder } = require("discord.js");
const { setUserBalance, addNewUser, getUserBalance } = require("../database");

const setForUser = new SlashCommandBuilder()
  .setName("set-for-user")
  .setDescription("Sets a user's balance to a specific amount")
  .addUserOption(option =>
    option
      .setName('user')
      .setDescription('The user to set the balance for')
      .setRequired(true)
    )
  .addIntegerOption(option =>
    option
      .setName('balance')
      .setDescription('The amount to set the balance to')
      .setRequired(true)
  );

const handler = async (interaction) => {
  await interaction.deferReply({ ephemeral: true });
  const balance = interaction.options.getInteger("balance");
  const isAdmin = interaction.member.permissions.has(process.env.ADMIN_PERMISSION);
  if(!isAdmin) {
    await interaction.editReply("You are not authorized to use this command");
    return;
  }
  const user = interaction.options.getUser("user");
  try {
    const current_balance = await getUserBalance(user.id);
    if(isNaN(current_balance)) {
      await addNewUser(user.id);
    }
    await setUserBalance(user.id, balance);
    await interaction.editReply(`The balance for ${user.username} has been set to ${balance}`);
  } catch (err) {
    console.error(err);
    await interaction.editReply("Failed to update user's balance");
  }
  
  return;
};

module.exports = {
  name: "set-for-user",
  command: setForUser,
  handler: handler,
};