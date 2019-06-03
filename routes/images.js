const express = require('express');
const fs = require('fs');
const path = require('path');

const { DATA_SITE } = require('../config/env')
const { UPLOAD_PATH } = require('../config/upload');
const router = express.Router();
const { getAll, getPaginate, getById, deleteById, totalEntries } = require('../model/images');
const { getAllByMenuId } = require('../model/menus');


const makeImageUri = e => ({
        medium: `/cemese/display/image?size=med&filename=${encodeURIComponent(e.filename)}&mimetype=${encodeURIComponent(e.mimetype)}`,
        thumbnail: `/cemese/display/image?size=min&filename=${encodeURIComponent(e.filename)}&mimetype=${encodeURIComponent(e.mimetype)}`,
        uri: `/cemese/display/image?size=original&filename=${encodeURIComponent(e.filename)}&mimetype=${encodeURIComponent(e.mimetype)}`,
    })
    // Views
router.get('/', (req, res, next) => {
    // DB
    let principalMenu = [];

    getAllByMenuId(1).then(menus => {
        principalMenu = menus;
        return getAll();
    }).then(images => {
        const imgs = images.map(e => ({...e, ...makeImageUri(e) }))
        res.render('galery', {
            dataSite: DATA_SITE,
            images: imgs,
            principalMenu,
            metadata: res.metadata
        });
    }).catch(err => res.send(err))
});

router.get('/delete', (req, res, next) => {
    getById(req.query.id).then(data => {
        if (data.length === 1) {
            const image = data[0]
            const file = path.join(process.cwd(), UPLOAD_PATH, 'original', image.filename)
            const fileMed = path.join(process.cwd(), UPLOAD_PATH, 'med', image.filename)
            const fileMin = path.join(process.cwd(), UPLOAD_PATH, 'min', image.filename)

            if (fs.existsSync(file)) {
                fs.unlink(file, (err) => { if (err) throw err; });
            }

            if (fs.existsSync(fileMed)) {
                fs.unlink(fileMed, (err) => { if (err) throw err; });
            }
            if (fs.existsSync(fileMin)) {
                fs.unlink(fileMin, (err) => { if (err) throw err; });
            }
            // DB
            deleteById(data[0].id).then(data => {
                res.redirect('/cemese/galery?type=redirect&result=Archivo Eliminado Con Exito');
            }).catch(err => {
                res.redirect('/cemese/galery?type=redirect&result=Error en DB o archivo no existe');
            })

        }

    }).catch(err => {
        res.send(err);
    })
})

// JSON page=3&items=1
router.get('/json', (req, res, next) => {

    totalEntries().then(e => {
        const total = e.count
        const items = req.query.items ? Number.parseInt(req.query.items) : 4

        const page = (req.query.page ? (Number.parseInt(req.query.page) - 1) : 0) * items
        const pages = Number.parseInt(total / items) + (total % items > 0 ? 1 : 0)

        const from = 0
        const to = 0
        getPaginate(page, items).then(images => {
            console.log(page, items)
            const imgs = {
                pages: pages,
                total: total,
                data: images.map(e => ({...e, ...makeImageUri(e) })),
            }
            res.send(imgs);
        })

    }).catch(err => {
        res.send(err);
    })
});

module.exports = router;