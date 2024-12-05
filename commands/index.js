const add = require("./add");
const ping = require("./ping");
const set = require("./set");
const balance = require("./balance");
const setForUser = require("./setForUser");
const addForUser = require("./addForUser");

const commands = [add, ping, set, balance, setForUser, addForUser];
const handlers = {};
commands.forEach(command => {
  handlers[command.name] = command.handler;
});

module.exports = {
  commands,
  handlers,
};