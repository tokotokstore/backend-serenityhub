require('./connection');

const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
const routers = require('./src/routes');
const app = express();
const createError = require('http-errors');
const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 5500;
app.use(cors());

const authRouter = require('./src/auth/router');
const commentRouter = require('./src/comment/router');
const reportRouter = require('./src/reports/router');
const uploadImage = require('./src/image/uploadImage');

const { decodeToken } = require('./src/auth/middleware');

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' },
);
// app.use(function (req, res, next) {
//   res.status(404).send('resource not found');
//   next();
// });
// app.use(morgan('combined', { stream: accessLogStream }));

app.use(decodeToken());

app.use(authRouter);
app.use(commentRouter);
app.use(reportRouter);
app.use(routers);
app.use(uploadImage);

const server = app.listen(port, () => console.log(`server running at ${port}`));
module.exports = server;
