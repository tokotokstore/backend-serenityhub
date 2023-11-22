const expres = require('express');
const routers = require('./src/routes');

const app = expres();
const port = 5500;

app.use(routers);
app.listen(port, () => console.log(`server running at ${port}`));
