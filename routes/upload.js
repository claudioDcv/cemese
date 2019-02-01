const express = require('express');
const sharp = require('sharp');

const fs = require('fs')
const path = require('path');
const { upload, UPLOAD_PATH } = require('../config/upload');
const { add } = require('../model/images');

const router = express.Router();

/* GET users listing. */
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const file = path.join(process.cwd(), UPLOAD_PATH, 'original', req.file.filename)
    const fileMed = path.join(process.cwd(), UPLOAD_PATH, 'med', req.file.filename)
    const fileMin = path.join(process.cwd(), UPLOAD_PATH, 'min', req.file.filename)

    sharp(file).resize(500, 500).toBuffer((err, buf) => {
      if (err) return next(err)
      fs.writeFile(fileMed, buf, (err) => {
        if (err) throw err;
      });
    })
    // thumbnail 200 * 200
    sharp(file).resize(200, 200).toBuffer((err, buf) => {
      if (err) return next(err)
      fs.writeFile(fileMin, buf, (err) => {
        if (err) throw err;
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
    }).then(data => {
      console.log(data)
      res.redirect('/cemese/galery?type=redirect&result=Archivo Subido Con Exito');
    });
  } catch (err) {
    res.sendStatus(400);
  }
});

module.exports = router;
