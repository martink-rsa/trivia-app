const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send({ response: 'GET is a success' }).status(200);
});

module.exports = router;
