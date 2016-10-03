const express = require('express');
const router = express.Router();
const asana = require('../../asana');

const ASANA_USER_ID = 24499340153675;
const ASANA_WORKSPACE_ID = 498346170860;

router.get('/projects', (req, res) => {
  asana.projects.findAll({
    assignee: ASANA_USER_ID,
    workspace: ASANA_WORKSPACE_ID
  })
    .then(({data}) => {
      console.log('[router] data: ', data);
    });
  res.send(200);
});

router.post('/projects', (req, res) => {
  const {body, params} = req;
});

router.put('/projects/:id', (req, res) => {
  const {body, params} = req;
  // asana.projects.update()
});

router.delete('/projects/:id', (req, res) => {
  asana.projects.delete(taskId);
});

module.exports = router;
