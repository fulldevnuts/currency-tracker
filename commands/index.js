const add = require("./add");
const ping = require("./ping");
const set = require("./set");
const balance = require("./balance");
const setForUser = require("./setForUser");

const commands = [add, ping, set, balance, setForUser];
const handlers = {};
commands.forEach(command => {
  handlers[command.name] = command.handler;
});

module.exports = {
  commands,
  handlers,
};