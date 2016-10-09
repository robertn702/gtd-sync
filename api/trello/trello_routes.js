const express = require('express');
const router = express.Router();
const trello = require('./trello_client');

router.route('/webhook')
  .get((req, res) => {
    res.sendStatus(200);
  })
  .post((req, res) => {
    console.log('[trello_webhook_routes] req.body: ', req.body);
    console.log('[trello_webhook_routes] @post here');
    res.sendStatus(200);
  });

module.exports = router;
