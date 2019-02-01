const express = require('express');

const { DATA_SITE } = require('../config/env')
const { getAllByMenuId } = require('../model/menus');
const { getAll } = require('../model/categories');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
    let principalMenu = [];
    getAllByMenuId(1).then(menu => {
        principalMenu = menu;
        return getAll();
    }).then(categories => {
        res.render('categories', {
            dataSite: DATA_SITE,
            principalMenu,
            categories,
            metadata: res.metadata
        });
    }).catch(err => {
        res.send(err);
    })
});

module.exports = router;
