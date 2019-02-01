const express = require('express');

const { DATA_SITE } = require('../config/env')
const nodeFriendlyUrl = require('../helpers/node-friendly-url');
const { getAllByMenuId } = require('../model/menus');
const { getAll, add, getByFriendlyUrl, deleteById, updateById, getLikeFriendlyUrl } = require('../model/posts');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
    let principalMenu = [];
    getAllByMenuId(1).then(menu => {
        principalMenu = menu;
        return getAll();
    }).then(posts => {
        res.render('posts', {
            dataSite: DATA_SITE,
            posts,
            principalMenu
        });
    }).catch(err => {
        res.send(err);
    })
});

router.get('/create', (req, res) => {
    getAllByMenuId(1).then(principalMenu => {
        res.render('createPost', {
            dataSite: DATA_SITE,
            principalMenu,
            metadata: res.metadata
        });
    }).catch(err => {
        res.send(err);
    })
});

router.get('/edit/:post', (req, res) => {
    let principalMenu = [];
    getAllByMenuId(1).then(menu => {
        principalMenu = menu;
        return getByFriendlyUrl(req.params.post);
    }).then(post => {
        res.render('editPost', {
            dataSite: DATA_SITE,
            principalMenu,
            post: post[0],
            metadata: res.metadata
        });
    }).catch(err => {
        res.send(err);
    })
});

router.get('/view/:post', (req, res) => {
    let principalMenu = [];
    getAllByMenuId(1).then(menu => {
        principalMenu = menu;
        return getByFriendlyUrl(req.params.post);
    }).then(post => {
        res.render('viewPost', {
            dataSite: DATA_SITE,
            principalMenu,
            post: post[0],
            metadata: res.metadata
        });
    }).catch(err => {
        res.send(err);
    })
});

router.post('/create', (req, res) => {
    const date = new Date();
    const data = { ...req.body, create_at: date };
    data.friendly_url = nodeFriendlyUrl(data.title, 300)
    friendlify(data.friendly_url).then(e => {
        data.friendly_url = e
        add(data).then(da => {
            res.redirect('/cemese/posts?type=redirect&result=Post Creado Con Exito');
        }).catch(err => {
            res.send(err)
        })

    })
});

router.post('/update', (req, res) => {
    try {
        const data = { ...req.body };
        data.friendly_url = nodeFriendlyUrl(data.title, 300)
        updateById(data).then(data => {
            res.redirect('/cemese/posts?type=redirect&result=Post Actualizado Con Exito');
        }).catch(err => {
            res.send(err)
        })
    } catch (err) {
        res.send(err);
    }
});

router.get('/delete', (req, res, next) => {
    deleteById(req.query.id).then(data => {
        res.redirect('/cemese/posts?type=redirect&result=Post Eliminado Con Exito');
    }).catch(err => {
        console.log(err)
        res.redirect('/cemese/posts?type=redirect&result=Error en DB');
    })
});

// METODO QUE CREA LA URI AMIGABLE y se preocupa que no se repita
const friendlify = t => {
    return new Promise((resolve, reject) => {
        getByFriendlyUrl(t).then(e => {
            var reg = /^\d+$/;
            if (e.length > 0) {
                const name = t + '-1'
                var rr = (nn) => {
                    getByFriendlyUrl(nn).then(ee => {
                        if (ee.length > 0) {
                            var eArr = nn.split('-')
                            var lastElmArr = eArr[eArr.length - 1]
                            if (reg.test(lastElmArr)) {
                                eArr[eArr.length - 1] = (lastElmArr * 1) + 1
                                rr(eArr.join('-'))
                            } else {
                                rr(nn + '-1')
                            }
                        } else {
                            resolve(nn)
                        }
                    }).catch(err => {
                        reject(err);
                    })
                }
                rr(name)
            } else {
                // Crear Normal
                resolve(t)
            }
        }).catch(err => {
            reject(err);
        })
    })
};

module.exports = router;
