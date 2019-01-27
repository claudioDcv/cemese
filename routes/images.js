var express = require('express');
var fs = require('fs');
var path = require('path');

var { DATA_SITE } = require('../config/env')
var { UPLOAD_PATH } = require('../config/upload');
var router = express.Router();
var { getAll, getById, deleteById } = require('../model/images');
var { getAllByMenuId } = require('../model/menus');

// Views
router.get('/', function (req, res, next) {
  // DB
  let principalMenu = [];

  getAllByMenuId(1).then(menus => {
    principalMenu = menus;
    return getAll();
  }).then(images => {
    const imgs = images.map(e => ({
      ...e,
      thumbnail: `/cemese/display/image?size=min&filename=${encodeURIComponent(e.filename)}&mimetype=${encodeURIComponent(e.mimetype)}`,
      uri: `/cemese/display/image?filename=${encodeURIComponent(e.filename)}&mimetype=${encodeURIComponent(e.mimetype)}`,
    }))
    res.render('galery', {
      dataSite: DATA_SITE,
      images: imgs,
      principalMenu,
      metadata: res.metadata
    });
  }).catch(err => {
    res.send(err);
  })
});

// Functionalities
router.get('/delete', function (req, res, next) {
  getById(req.query.id).then(data => {
    if (data[0]) {
      // res.send(data[0])
      const file = path.join(process.cwd(), UPLOAD_PATH, 'original', req.file.filename)
      const fileMin = path.join(process.cwd(), UPLOAD_PATH, 'min', req.file.filename)

      if (fs.existsSync(file)) {
        // FILE SYSTEM
        fs.unlink(file, (err) => {
          if (err) throw err;
          console.log(file + ' was deleted');
        });
      }
      // DELETE THUMBNAIL 200 * 200
      if (fs.existsSync(fileMin)) {
        // FILE SYSTEM
        fs.unlink(fileMin, (err) => {
          if (err) throw err;
          console.log(fileMin + ' was deleted');
        });
      }
      // DB
      deleteById(data[0].id).then(data => {
        res.redirect('/cemese/galery?type=redirect&result=Archivo Eliminado Con Exito');
      }).catch(err => {
        console.log(err)
        res.redirect('/cemese/galery?type=redirect&result=Error en DB o archivo no existe');
      })

    }

  }).catch(err => {
    res.send(err);
  })
});

// JSON
router.get('/json', function (req, res, next) {
  getAll().then(images => {
    const imgs = images.map(e => ({
      ...e,
      thumbnail: `/cemese/display/image?size=min&filename=${encodeURIComponent(e.filename)}&mimetype=${encodeURIComponent(e.mimetype)}`,
      uri: `/cemese/display/image?filename=${encodeURIComponent(e.filename)}&mimetype=${encodeURIComponent(e.mimetype)}`,
    }))
    res.send(imgs);
  }).catch(err => {
    res.send(err);
  })
});
module.exports = router;
