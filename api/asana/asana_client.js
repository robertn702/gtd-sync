const Asana = require('asana');
const config = require('./asana.config');
const asana = Asana.Client.create().useAccessToken(config.personalAccessToken);
module.exports = asana;
