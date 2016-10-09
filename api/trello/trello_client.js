// https://github.com/adunkman/node-trello
const Trello = require('node-trello');
const config = require('./trello.config');
const trello = new Trello(config.key, config.token);

return trello;
