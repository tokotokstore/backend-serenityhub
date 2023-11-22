const router = require('express').Router();

const multer = require('multer');
const reportController = require('./controller');

router.get('/report/:id', reportController.getDetailReport);
router.get('/report', reportController.getAllReport);
router.post('/report', multer().none(), reportController.addReport);

module.exports = router;
