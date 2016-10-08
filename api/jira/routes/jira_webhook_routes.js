const express = require('express');
const router = express.Router();
const jira = require('../jira_client');
const asana = require('../../asana/asana_client');
const db = require('../../../db/db');
const dbUtils = require('../../../db/db_utils');
const jiraConfig = require('../jira.config');

router.route('/webhook')
  .get((req, res) => {
    console.log('[jira_webhook_routes] @get -> req.body: ', req.body);
  })
  .post((req, res) => {
    const {
      body: {
        issue
      }
    } = req;

    dbUtils.findOrCreateJiraIssueToAsanaTask(issue, (asanaTask) => {
      res.send(asanaTask);
    });
  });

module.exports = router;
