const {JiraApi} = require('jira');
const config = require('./jira.config');

const jira = new JiraApi(
  'https',
  config.host,
  config.port,
  config.user,
  config.password,
  // '2.0.alpha1',
  '2',
  true, // verbose
  false // strictSSL
);

module.exports = jira;
