
const { SlashCommandBuilder } = require("discord.js");
const { addNewUser, getUserBalance } = require("../database");

const balanceForUser = new SlashCommandBuilder()
  .setName("balance-for-user")
  .setDescription("Shows a user's balance")
  .addUserOption(option =>
    option
      .setName('user')
      .setDescription('The user to show the balance for')
      .setRequired(true)
    )

const handler = async (interaction) => {
  await interaction.deferReply({ ephemeral: true });
  const isAdmin = interaction.member.permissions.has(process.env.ADMIN_PERMISSION);
  if(!isAdmin) {
    await interaction.editReply("You are not authorized to use this command");
    return;
  }
  const user = interaction.options.getUser("user");
  try {
    let balance = await getUserBalance(user.id);
    if(isNaN(balance)) {
      balance = 0;
      await addNewUser(user.id);
    }
    await interaction.editReply(`The balance for ${user.username} is ${balance}`);
  } catch (err) {
    console.error(err);
    await interaction.editReply("Failed to retrive user's balance");
  }
  
  return;
};

module.exports = {
  name: "balance-for-user",
  command: balanceForUser,
  handler: handler,
};