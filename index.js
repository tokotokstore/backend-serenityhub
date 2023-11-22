const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
const routers = require('./src/routes');
const app = express();
const port = 5500;
const authRouter = require('./src/auth/router');

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' },
);
// app.use(morgan('combined', { stream: accessLogStream }));
app.use(authRouter);
app.use(routers);

app.listen(port, () => console.log(`server running at ${port}`));
