const express = require('express');
const fs = require('fs');
const path = require('path');
const { UPLOAD_PATH } = require('../config/upload');

const router = express.Router();

/* GET home page. */
router.get('', (req, res) => {
    const { filename, mimetype, size } = req.query;

    const m = decodeURIComponent(mimetype);
    const f = decodeURIComponent(filename);
    const s = decodeURIComponent(size);

    let PATH = UPLOAD_PATH
    switch (s) {
        case 'original':
            PATH += '/original'
            break;
        case 'min':
            PATH += '/min'
            break;
        case 'med':
            PATH += '/med'
            break;
        case 'big':
            PATH += '/big'
            break;
        default:
            break;
    }

    if (!fs.existsSync(path.join(PATH, f))) {
        const file = path.join(process.cwd(), 'public', 'images', 'noimage.png')
        res.setHeader('Content-Type', 'image/png');
        fs.createReadStream(file).pipe(res);
    } else {
        try {
            res.setHeader('Content-Type', m);
            fs.createReadStream(path.join(PATH, f)).pipe(res);
        } catch (err) {
            res.sendStatus(400);
        }
    }

});

module.exports = router;