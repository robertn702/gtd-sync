const express = require('express');
const router = express.Router();

const jira = require('./jira_client');

const issuesRoutes = require('./routes/jira_issues_routes');

jira.listIssueTypes((err, issueTypes) => {
  console.log('[jira_routes] issueTypes: ', issueTypes);
})

/* Routes */
module.exports = (app) => {
  app.use('/jira', issuesRoutes);
}
