const express = require('express');
const router = express.Router();

const jira = require('./jira_client');

const issuesRoutes = require('./routes/jira_issues_routes');
const webhookRoutes = require('./routes/jira_webhook_routes');

/* Routes */
module.exports = (app) => {
  app.use('/jira', issuesRoutes);
  app.use('/jira', webhookRoutes);
}
