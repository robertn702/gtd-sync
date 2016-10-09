const express = require('express');
const router = express.Router();

/* Routes */
router.route('/webhook')
  .post((req, res) => {
    res.sendStatus(200);
  });

module.exports = router;
