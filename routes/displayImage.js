var express = require('express');
var fs = require('fs');
var path = require('path');
var { UPLOAD_PATH } = require('../config/upload');

var router = express.Router();

/* GET home page. */
router.get('', (req, res) => {
    const { filename, mimetype } = req.query;

    const m = decodeURIComponent(mimetype);
    const f = decodeURIComponent(filename);
    if (!fs.existsSync(path.join(UPLOAD_PATH, f))) {
        const file = path.join(process.cwd(), 'public', 'images', 'noimage.png')
        res.setHeader('Content-Type', 'image/png');
        fs.createReadStream(file).pipe(res);
    } else {
        try {
            res.setHeader('Content-Type', m);
            fs.createReadStream(path.join(UPLOAD_PATH, f)).pipe(res);
        } catch (err) {
            res.sendStatus(400);
        }
    }

});

module.exports = router;