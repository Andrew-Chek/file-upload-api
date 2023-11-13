const express = require('express');
const { uploadFile, deleteFile, getFileNames } = require('./uploadService');
const router = express.Router();

router.post('/uploadFile', uploadFile);

router.get('/getFileNames', getFileNames);

router.delete('/deleteFile/:fileName', deleteFile);

module.exports = {
  uploadRouter: router,
};
