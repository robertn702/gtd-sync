const express = require('express');
const router = express.Router();
const asana = require('../asana_client');
const config = require('../asana.config');

router.route('/projects')
  .get((req, res) => {
    asana.projects.findAll({
      assignee: config.userId,
      workspace: config.defaultWorkspaceId
    })
      .then(({data}) => {
        console.log('[router] data: ', data);

      });
    res.send(200);
  })
  .post((req, res) => {
    const {body, params} = req;
  });

router.route('/projects/:id')
  .get((req, res) => {
    const {body, params} = req;
  })
  .put((req, res) => {
    const {body, params} = req;
  })
  .delete((req, res) => {
    const {body, params} = req;
    asana.projects.delete(params.id);
  });

module.exports = router;
