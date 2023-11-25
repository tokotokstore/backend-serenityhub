const express = require('express');
const routers = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();

routers.get('/', (req, res) => res.send('halaman utama'));
routers.get('/public/download/:name', (req, res) => {
  const filename = `../public/${req.params.name}`;
  res.download(path.join(__dirname, filename));
});

routers.get('/public/:name', (req, res, next) => {
  const filename = `../public/${req.params.name}`;
  res.download(path.join(__dirname, filename));
});

module.exports = routers;
