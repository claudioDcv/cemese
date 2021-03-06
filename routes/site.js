const express = require('express');

const { DATA_SITE } = require('../config/env')
const { getAllByMenuId } = require('../model/menus');
const { getByFriendlyUrl } = require('../model/posts');

const router = express.Router();

/* GET users listing. */
router.get('/posts/view/:post', (req, res) => {
    let principalMenu = [];
    getAllByMenuId(1).then(menu => {
        principalMenu = menu;
        return getByFriendlyUrl(req.params.post);
    }).then(post => {
        res.render('site/viewPost', {
            dataSite: DATA_SITE,
            principalMenu,
            post: post[0],
            metadata: res.metadata
        });
    }).catch(err => {
        res.send(err);
    })
});

module.exports = router;
