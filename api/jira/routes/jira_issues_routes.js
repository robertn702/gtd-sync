const express = require('express');
const router = express.Router();
const jira = require('../jira_client');
const config = require('../jira.config');

router.route('/issues')
  .get((req, res) => {
    jira.searchJira(`assignee=${config.user}`, null, (err, jiraRes, body) => {
      // console.log('[jira_routes] err: ', err);
      // console.log('[jira_routes] res.issues: ', res.issues[0]);
      // console.log('[jira_routes] body: ', body);
      res.send(jiraRes);
    });
  })
  .post((req, res) => {

  });

router.route('/issues/:id')
  .get((req, res) => {

  })
  .put((req, res) => {

  })
  .delete((req, res) => {

  });

module.exports = router;
