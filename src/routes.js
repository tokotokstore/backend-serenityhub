const routers = require('express').Router();

routers.get('/', (req, res) => res.send('halaman utama'));

module.exports = routers;
