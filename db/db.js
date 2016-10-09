'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('gtd');
const dbUtils = require('./db_utils');

dbUtils.initializeTable(db, 'jira_issues', `
  id integer PRIMARY KEY,
  project_id integer NOT NULL,
  asana_task_id integer NOT NULL UNIQUE
`);

dbUtils.initializeTable(db, 'jira_projects', `
  id integer PRIMARY KEY,
  asana_project_id integer NOT NULL UNIQUE
`);

dbUtils.initializeTable(db, 'trello_cards', `
  id string PRIMARY KEY,
  asana_project_id integer NOT NULL UNIQUE
`);

dbUtils.initializeTable(db, 'trello_checklists', `
  id string PRIMARY KEY,
  card_id string NOT NULL,
  asana_section_id integer NOT NULL UNIQUE
`);

dbUtils.initializeTable(db, 'trello_checklist_items', `
  id string PRIMARY KEY,
  checklist_id string NOT NULL,
  asana_task_id NOT NULL UNIQUE
`);

module.exports = db;
