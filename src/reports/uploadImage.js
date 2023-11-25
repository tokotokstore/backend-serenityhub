const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const imageFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(null, false);
  }
  cb(null, true);
};

router.get('/download', (req, res) => {
  const filename = '../public/lampu_jalan_mati.jpeg';
  res.download(path.join(__dirname, filename));
});
const upload = multer({ dest: 'public', fileFilter: imageFilter });

router.post('/upload', upload.single('image'), (req, res) => {
  const file = req.file;
  const type = req.file.mimetype;
  const fileType = type.substring(type.indexOf('/') + 1);
  console.log(fileType);
  if (file) {
    const target = path.join(__dirname, '../../public', file.path + fileType);
    console.log(target);

    fs.renameSync(file.path, target);
    res.send('upload sukses');
  } else {
    res.send('gagal upload');
  }
});

module.exports = router;
