var express = require('express');
var { getAllByMenuId } = require('../model/menus');
var { login } = require('../auth/authentication');

var router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
    getAllByMenuId(1).then(principalMenu => {
        res.render('index', {
            title: 'Express',
            principalMenu,
            metadata: res.metadata
        });
    }).catch(err => {
        res.send(err);
    })
});

router.get('/login', (req, res) => {
    getAllByMenuId(1).then(principalMenu => {
        res.render('login', {
            title: 'Express',
            principalMenu,
            metadata: res.metadata
        });
    }).catch(err => {
        res.send(err);
    })
});

router.post('/login', (req, res) => {
    console.log('>> 1');

    login(req.body)
        .then(data => {
            console.log('>> 5');
            var randomNumber = Math.random().toString();
            randomNumber = randomNumber.substring(2, randomNumber.length);
            res.cookie('cookieName', randomNumber, {
                maxAge: 900000,
                httpOnly: true,
            });
            res.cookie('x-api-token', data.username, {
                maxAge: 900000,
                httpOnly: true,
            })
            res.cookie('hasLogin', true, {
                maxAge: 900000,
                httpOnly: true,
            })
            res.redirect('/cemese/posts');
        })
        .catch(err => {
            res.redirect('/cemese/login');
        })
});

router.get('/logout', (req, res) => {
    res.clearCookie('x-api-token');
    res.clearCookie('cookieName');
    res.clearCookie('hasLogin');
    res.redirect('/cemese');
});

router.get('/forbidden', (req, res) => {
    getAllByMenuId(1).then(principalMenu => {
        res.render('forbidden', {
            title: 'forbidden',
            principalMenu,
            metadata: res.metadata
        });
    }).catch(err => {
        res.send(err);
    })
});
module.exports = router;
