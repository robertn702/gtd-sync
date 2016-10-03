const express = require('express');
const router = express.Router();

/* Routes */
const tasksRoutes = require('./asana_tasks_routes');
const projectsRoutes = require('./asana_projects_routes');

module.exports = (app) => {
  app.use('/asana', tasksRoutes);
  app.use('/asana', projectsRoutes);
  // app.use('/asana', )
}
