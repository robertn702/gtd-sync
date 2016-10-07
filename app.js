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
require('./api/asana/asana_routes')(app);
require('./api/trello/trello_routes')(app);
require('./api/jira/jira_routes')(app);

/* Start Server */
app.listen(port, () => {
  console.log('[app] listening on port: ', port);
});
