const ReportUser = require('./model');
const path = require('path');
const fs = require('fs');

async function addReport(req, res, next) {
  if (!req.user) {
    return res.json({
      error: 1,
      message: `You're not not login or token expired`,
    });
  }
  try {
    const payload = req.body;
    console.log(payload);
    // const image = req.files;
    // console.log(image);
    const user = req.user;
    // const imageString = [];
    // if (image) {
    //   for (let i = 0; i < image.length; i++) {
    //     const target = path.join(
    //       __dirname,
    //       '../../public',
    //       image[i].originalname,
    //     );
    //     const fileType = image[i].mimetype.substring(
    //       image[i].mimetype.indexOf('/') + 1,
    //     );

    //     fs.renameSync(image[i].path, `${image[i].path}.${fileType}`);
    //     imageString.push(`${image[i].filename}.${fileType}`);
    //   }
    //   console.log(imageString);
    // }
    const newReport = new ReportUser({
      ...payload,
      user: user._id,
      // imageReport: [...imageReport, imageString],
    });

    await newReport.save();
    if (newReport) {
      return res.json({
        status: 'ok',
        message: 'Laporan berhasil dibuat',
        data: newReport._id,
      });
    }
  } catch (err) {
    if (err && err.name === 'ValidationError') {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
}

async function getDetailReport(req, res, next) {
  if (!req.user) {
    return res.json({
      error: 1,
      message: `You're not not login or token expired`,
    });
  }
  try {
    const report = await ReportUser.findOne({ _id: req.params.id }).populate({
      path: 'comment',
      select: ['message', 'name'],
    });
    if (report) {
      res.send({
        status: 'ok',
        data: report,
      });
    }
  } catch (err) {
    return res.json({
      error: 1,
      message: 'report tidak ada',
    });
    next(err);
  }
}

async function getAllReport(req, res, next) {
  try {
    const report = await ReportUser.find()
      .populate({
        path: 'comment',
        select: ['message', 'name'],
      })
      .select('-imageFinished -comment  -address -longitude -latitude ');
    if (report) {
      res.send({
        status: 'ok',
        data: report,
      });
    }
  } catch (err) {
    return res.json({
      error: 1,
      message: err.message,
    });
    next(err);
  }
}

module.exports = { getDetailReport, getAllReport, addReport };
