var express = require('express');
var bcrypt = require('bcrypt');
var { getAll } = require('../model/posts');

var { DATA_SITE } = require('../config/env')

var { getAllByMenuId } = require('../model/menus');
var { login } = require('../auth/authentication');

var router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
    let principalMenu = [];
    getAllByMenuId(1).then(menu => {
        principalMenu = menu;
        return getAll();
    }).then(posts => {
        res.render('site/index', {
            dataSite: DATA_SITE,
            posts,
            principalMenu
        });
    }).catch(err => {
        res.send(err);
    })
});

router.get('/login', (req, res) => {
    getAllByMenuId(1).then(principalMenu => {
        res.render('site/login', {
            dataSite: DATA_SITE,
            principalMenu,
            metadata: res.metadata
        });
    }).catch(err => {
        res.send(err);
    })
});

router.get('/dashboard', (req, res) => {
    getAllByMenuId(1).then(principalMenu => {
        res.render('dashboard', {
            dataSite: DATA_SITE,
            principalMenu,
        });
    }).catch(err => {
        res.send(err);
    })
});

router.post('/login', (req, res) => {
    login(req.body)
        .then(data => {
            if (bcrypt.compareSync(req.body.password, data.password)) {
                req.session.user = data.username;
                res.redirect('/cemese/dashboard');
            } else {
                res.redirect('/cemese/login');
            }
        })
        .catch(err => {
            res.redirect('/cemese/login');
        })
});

router.get('/logout', (req, res) => {
    res.clearCookie('user_sid');
    res.redirect('/cemese');
});

router.get('/forbidden', (req, res) => {
    getAllByMenuId(1).then(principalMenu => {
        res.render('forbidden', {
            dataSite: DATA_SITE,
            principalMenu,
            metadata: res.metadata
        });
    }).catch(err => {
        res.send(err);
    })
});
module.exports = router;
