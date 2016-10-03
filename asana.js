const Asana = require('asana');
const asana = Asana.Client.create().useAccessToken(process.env.PERSONAL_ACCESS_TOKEN);
module.exports = asana;
