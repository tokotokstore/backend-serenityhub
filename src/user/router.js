const router = require('express').Router();
const multer = require('multer');
const userController = require('./controller');

router.get('/admin/officer', userController.getOFficer);

module.exports = router;
