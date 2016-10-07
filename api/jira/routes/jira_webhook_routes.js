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

    // console.log('[jira_webhook_routes] issue: ', issue);

    db.get(`
      SELECT * FROM jira_issues
      WHERE id = ${issue.id}
      JOIN jira_projects
      ON jira_issues.project_id=jira_projects.id
      LIMIT 1
    `, (err, row) => {
      if (err) {
        console.log('[jira_webhook_routes] error finding id: ', err);
      }

      console.log('[jira_webhook_routes] row: ', row);

      if (!row) {
        console.log('[jira_webhook_routes] creating asana task');
        asana.users.me().then((me) => {
          console.log('[jira_webhook_routes] me: ', me);
          asana.tasks.createInWorkspace(jiraConfig.workspaces.ENGAGIO.toString(),
          {
            name: `[${issue.key}] ${issue.fields.summary}`,
            notes: `${issue.fields.description}`,
            assignee: me.id
          }).then((asanaTask) => {
            db.run(`INSERT INTO jira_issues (id,project_id,asana_task_id) VALUES (${issue.id},${asanaTask.project_id},${asanaTask.id})`)
          })
        })
      } else {
        console.log('[jira_webhook_routes] got assana task row: ', row);
      }
    })
  });

module.exports = router;
