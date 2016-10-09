'use strict';

/* Load ENV vars */
const DotEnv = require('dotenv-node');
new DotEnv();

const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const port = process.env.PORT || 8080;
const db = require('./db/db');

app.use(bodyParser.json());

/* Load Routes */
app.use('/asana', require('./api/asana/asana_routes'));
app.use('/jira', require('./api/jira/jira_routes'));
app.use('/trello', require('./api/trello/trello_routes'))

/* Start Server */
app.listen(port, () => {
  console.log('[app] listening on port: ', port);
});
