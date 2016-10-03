const express = require('express');
const router = express.Router();
const asana = require('../../asana');

const ASANA_USER_ID = 24499340153675;
const ASANA_WORKSPACE_ID = 498346170860;

router.get('/tasks', (req, res) => {
  // asana.tasks.findAll({
  //   assignee: ASANA_USER_ID,
  //   workspace: ASANA_WORKSPACE_ID
  // })
  //   .then(({data}) => {
  //     console.log('[router] data: ', data);
  //   });
  res.send(200);
});

router.post('/tasks', (req, res) => {
  const {body, params} = req;
});

router.put('/tasks/:id', (req, res) => {
  const {body, params} = req;
  // asana.tasks.update()
});

router.delete('/tasks/:id', (req, res) => {
  asana.tasks.delete(taskId);
});

module.exports = router;
