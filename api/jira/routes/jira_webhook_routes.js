const express = require('express');
const router = express.Router();
const jira = require('../jira_client');
const asana = require('../../asana/asana_client');
const db = require('../../../db/db');
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

    console.log('[jira_webhook_routes] issue: ', issue);

    db.get(`SELECT asana_id FROM jira_issues WHERE id = ${issue.id} LIMIT 1`, (err, rows) => {
      if (err) {
        console.log('[jira_webhook_routes] error finding id: ', err);
      }

      if (!rows) {
        console.log('[jira_webhook_routes] creating asana task');
        asana.users.me().then((me) => {
          console.log('[jira_webhook_routes] me: ', me);
          asana.tasks.createInWorkspace(jiraConfig.workspaces.ENGAGIO.toString(),
          {
            name: `[${issue.key}] ${issue.fields.summary}`,
            notes: `${issue.fields.description}`,
            assignee: me.id
          }).then((asanaTask) => {
            db.run(`INSERT INTO jira_issues (id,asana_id) VALUES (${issue.id},${asanaTask.id})`)
          })
        })
      } else {
        console.log('[jira_webhook_routes] got assana task rows: ', rows);
      }
    })
  });

module.exports = router;
