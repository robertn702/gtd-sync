'use strict';

/* Load ENV vars */
const DotEnv = require('dotenv-node');
new DotEnv();

const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

/* Routes */
const asanaRoutes = require('./routes/asana/asana_routes');
const trelloRoutes = require('./routes/trello/trello_routes');

app.use(bodyParser.json());

/* Load Routes */
asanaRoutes(app);
trelloRoutes(app);

/* Start Server */
app.listen(port, () => {
  console.log('[app] listening on port: ', port);
});
