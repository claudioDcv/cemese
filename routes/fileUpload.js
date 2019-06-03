const express = require('express');
var Busboy = require('busboy');
var fs = require('fs');
var path = require('path');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
    res.render('file-upload');
});

router.post('/', (req, res) => {
    var busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
        file.on('data', function(data) {
            console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
        });

        var saveTo = path.join('.', 'uploads', 'files', filename);
        console.log('Uploading: ' + saveTo);
        file.pipe(fs.createWriteStream(saveTo));

        file.on('end', function() {
            console.log('File [' + fieldname + '] Finished');
        });
    });
    busboy.on('filelabel', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
        console.log('Field [' + fieldname + ']: value: ' + val);
    });
    busboy.on('finish', function() {
        console.log('Done parsing form!');
        res.writeHead(303, { Connection: 'close', Location: '/cemese/file-upload' });
        res.end();
    });
    req.pipe(busboy);
});

module.exports = router;