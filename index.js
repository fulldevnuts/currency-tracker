const { Client, Events, GatewayIntentBits, SlashCommandBuilder } = require("discord.js");

require("dotenv").config()
const DISCORD_SERVER_ID = process.env.DISCORD_SERVER_ID;

const { addNewUser, getUserBalance, addAmountToUserBalance, setUserBalance } = require("./database.js");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, readyClient => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);

  const ping = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!");

  const add = new SlashCommandBuilder()
    .setName("add")
    .setDescription("Adds an amount to your balance")
    .addIntegerOption(option =>
      option
        .setName('amount')
        .setDescription('The amount to add')
        .setRequired(true)
    );

  const set = new SlashCommandBuilder()
    .setName("set")
    .setDescription("Sets your balance to a specific amount")
    .addIntegerOption(option =>
      option
        .setName('amount')
        .setDescription('The amount to add')
        .setRequired(true)
    );

  client.application.commands.create(ping, DISCORD_SERVER_ID);
  client.application.commands.create(add, DISCORD_SERVER_ID);
  client.application.commands.create(set, DISCORD_SERVER_ID);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    interaction.reply("Pong!");
    return;
  }

  if (interaction.commandName === "add") {
    const amount = interaction.options.getInteger("amount");
    const user_id = interaction.user.id;
    try {
      const balance = await getUserBalance(user_id);
      if(isNaN(balance)) {
        balance = 0;
        await addNewUser(user_id);
      }
      await addAmountToUserBalance(user_id, amount);
      interaction.reply(`${amount} has been added to your balance! New total is ${balance+amount}`);
    } catch (err) {
      console.error(err);
    }
    
    return;
  }

  if (interaction.commandName === "set") {
    const amount = interaction.options.getInteger("amount");
    const user_id = interaction.user.id;
    try {
      await setUserBalance(user_id, amount);
      interaction.reply(`Your balance has been set to ${amount}`);
    } catch (err) {
      console.error(err);
    }
    
    return;
  }

});

client.login(process.env.DISCORD_BOT_TOKEN);