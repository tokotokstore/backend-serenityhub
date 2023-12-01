const router = require('express').Router();

const multer = require('multer');
const reportController = require('./controller');

const imageFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(null, false);
  }
  cb(null, true);
};

const upload = multer({ dest: 'public', fileFilter: imageFilter });

router.get('/report/:id', reportController.getDetailReport);
router.get('/report', reportController.getAllReport);
router.post('/report', upload.array('image', 3), reportController.addReport);
router.put(
  '/report/:id',
  multer().none(),
  reportController.editReportToProcess,
);

router.get('/officer/report', reportController.getAllReportByUnitWorks);
router.get(
  '/officer/report/coordinates',
  reportController.getAllReportCoordinate,
);

module.exports = router;
