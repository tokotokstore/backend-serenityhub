const express = require('express');
const routers = require('express').Router();
require('../connection');

const app = express();

routers.get('/', (req, res) => res.send('halaman utama'));

module.exports = routers;
