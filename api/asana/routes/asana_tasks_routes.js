const express = require('express');
const router = express.Router();
const asana = require('../asana_client');

router.route('/tasks')
  .get((req, res, next) => {
    // get tasks (add filtering)
    // asana.tasks.findAll({
    //   assignee: ASANA_USER_ID,
    //   workspace: ASANA_WORKSPACE_ID
    // })
    //   .then(({data}) => {
    //     console.log('[router] data: ', data);
    //   });
  })
  .post((req, res, next) => {
    // create task
  });

router.route('/tasks/:id')
  .get((req, res, next) => {
    // get task
  })
  .put((req, res, next) => {
    // update task
  })
  .delete((req, res, next) => {
    // delete task
    asana.tasks.delete(taskId);
  });

module.exports = router;
