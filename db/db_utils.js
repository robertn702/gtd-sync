const db = require('./db');
const _ = require ('lodash');
const jira = require('../api/jira/jira_client');
const asana = require('../api/asana/asana_client');
const jiraConfig = require('../api/jira/jira.config');

module.exports = {
  findOrCreateJiraToAsanaProj(jiraProject, next) {
    const {id, key, name} = jiraProject;
    db.get(`
      SELECT asana_project_id
      FROM jira_projects
      LIMIT 1
    `, (err, jiraProjectRow) => {
      if (err) {
        console.log('[db_utils] @SELECT asana_project_ID from jira_projects -> error: ', err);
        return next(err);
      }

      if (!jiraProjectRow) {
        // create new asana project

        asana.projects.create({
          name: key,
          notes: name,
          workspace: jiraConfig.workspaces.ENGAGIO
        }).then((asanaProject) => {
          console.log('[db_utils] created asana project: ', asanaProject);
          // on successful complete, insert new row into jira_project table
          db.run(`
            INSERT INTO jira_projects (id,asana_project_id)
            VALUES (${id},${asanaProject.id})
          `, (err) => {
            if (err) {
              console.log('[db_utils] @INSERT INTO jira_project -> error: ', err);
            }
            return next(err, asanaProject)
          });
        })
      } else {
        console.log('[db_utils] @findOrCreateJiraToAsanaProj -> found row: ', jiraProjectRow);
        // get asana project and return'
        asana.projects.findById(jiraProjectRow.asana_project_id)
          .then((asanaProject) => {
            return next(null, asanaProject);
          });
      }
    })
  },
  findOrCreateJiraIssueToAsanaTask(jiraIssue, next) {
    db.get(`
      SELECT * FROM jira_issues
      JOIN jira_projects
      ON jira_issues.project_id=jira_projects.id
      LIMIT 1
    `, (err, jiraIssueRow) => {
      // WHERE jira_projects.id=${_.toNumber(jiraIssue.id)}
      if (err) {
        console.log('[jira_webhook_routes] @SELECT * FROM jira_issues: error', err);
        return next(err);
      }
      console.log('[db_utils] jiraIssueRow: ', jiraIssueRow);

      if (!jiraIssueRow) {
        this.findOrCreateJiraToAsanaProj(jiraIssue.fields.project, (err, asanaProject) => {
          asana.users.me().then((me) => {
            asana.tasks.create({
              assignee: me.id,
              name: `[${jiraIssue.key}] ${jiraIssue.fields.summary}`,
              notes: `${jiraIssue.fields.description}`,
              projects: _.toString(asanaProject.id)
            }).then((asanaTask) => {
              console.log('[db_utils] created asanaTask: ', asanaTask);
              db.run(`
                INSERT INTO jira_issues (id,project_id,asana_task_id)
                VALUES (${_.toNumber(jiraIssue.id)},${jiraIssue.fields.project.id},${asanaTask.id})
              `, (err) => {
                if (err) {
                  console.log('[db_utils] @INSERT INTO jira_issues -> error: ', err);
                }
                return next(err, asanaTask);
              });
            })
          })
        })
      } else {
        console.log('[jira_webhook_routes] got asana task jiraIssueRow: ', jiraIssueRow);
        asana.tasks.findById(jiraIssueRow.asana_task_id)
          .then((asanaTask) => {
            return next(null, asanaTask);
          });
      }
    })
  }
}
