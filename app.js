'use strict';

const DotEnv = require('dotenv-node');
new DotEnv();

const asana = require('./asana');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const port = process.env.PORT || 8080;
const asanaTasksRouter = require('./routes/asana/tasks');
// const asanaProjectsRouter = require('./routes/asana/projects');

app.use(bodyParser.json());


app.use('/asana', asanaTasksRouter);
// app.use('/asana', asanaProjects);

app.listen(port, () => {
  console.log('[app] listening on port: ', port);
});
