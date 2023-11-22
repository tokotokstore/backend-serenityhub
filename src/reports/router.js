const router = require('express').Router();

const reportController = require('./controller');

router.get('/report/:id', reportController.getReport);

module.exports = router;
