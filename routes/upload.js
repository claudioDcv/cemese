var express = require('express');
const sharp = require('sharp');

var fs = require('fs')
var { DATA_SITE } = require('../config/env')
var path = require('path');
var { upload, UPLOAD_PATH } = require('../config/upload');
var { add } = require('../model/images');

// const fs = require('fs');

var router = express.Router();

/* GET users listing. */
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const file = path.join(process.cwd(), UPLOAD_PATH, 'original', req.file.filename)
    const fileMin = path.join(process.cwd(), UPLOAD_PATH, 'min', req.file.filename)

    // thumbnail 200 * 200
    sharp(file).resize(200, 200).toBuffer(function (err, buf) {
      if (err) return next(err)
      fs.writeFile(fileMin, buf, function (err) {
        if (err) {
          return console.log(err);
        }
      });
    })

    add({
      originalname: req.file.originalname,
      encoding: req.file.encoding,
      mimetype: req.file.mimetype,
      destination: req.file.destination,
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
    }).then(e => {
      // { data: req.file }
      res.redirect('/cemese/galery?type=redirect&result=Archivo Subido Con Exito');
    });
  } catch (err) {
    res.sendStatus(400);
  }
});

module.exports = router;
