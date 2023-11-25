const router = require('express').Router();
const multer = require('multer');
const officerReportController = require('./controller');

router.post(
  '/officer/report',
  multer().none(),
  officerReportController.addReport,
);

module.exports = router;
