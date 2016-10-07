const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('gtd');

db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='jira_issues'", (err, rows) => {
  if (err) {
    console.log('[db] err: ', err);
  } else if (!rows) {
    db.run(`
      CREATE TABLE jira_issues (
        id integer PRIMARY KEY,
        project_id integer NOT NULL
        asana_task_id integer NOT NULL UNIQUE
      )
    `, (err) => {
      if (err) {
        console.log('[db] error creating jira_issues table: ', err);
      } else {
        console.log('[db] SQL Table "jira_issues" initialized');
      }
    });
  } else {
    console.log('[db] SQL Table "jira_issues" already initialized');
  }
});

db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='jira_projects'", (err, rows) => {
  if (err) {
    console.log('[db] err: ', err);
  } else if (!rows) {
    db.run(`
      CREATE TABLE jira_projects (
        id integer PRIMARY KEY,
        asana_project_id integer NOT NULL UNIQUE
      )
    `, (err) => {
      if (err) {
        console.log('[db] error creating jira_projects table: ', err);
      } else {
        console.log('[db] SQL Table "jira_projects" initialized');
      }
    })
  } else {
    console.log('[db] SQL Table "jira_projects" already initialized');
  }
});

module.exports = db;
