var express = require('express');

var makeFriendlyUrl = require('../helpers/makeFriendlyUrl');
var nodeFriendlyUrl = require('../helpers/node-friendly-url');
var { getAllByMenuId } = require('../model/menus');
var { getAll, add, getByFriendlyUrl, deleteById, updateById } = require('../model/posts');

var router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
    let principalMenu = [];
    getAllByMenuId(1).then(menu => {
        principalMenu = menu;
        return getAll();
    }).then(posts => {
        res.render('posts', {
            title: 'Posts',
            posts,
            principalMenu,
            metadata: res.metadata
        });
    }).catch(err => {
        res.send(err);
    })
});

router.get('/create', (req, res) => {
    getAllByMenuId(1).then(principalMenu => {
        res.render('createPost', {
            title: 'Posts',
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
            title: 'Posts',
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
            title: 'Posts',
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
    try {
        const data = { ...req.body, create_at: date };
        data.friendly_url = nodeFriendlyUrl(data.title, 300)
        // data.friendly_url = makeFriendlyUrl(data.friendly_url)
        // sera muy constoso si se crean muchas veces un elemento con el mismo nombre
        var veriryUnique = (req, res, data) => {
            var test = (d) => {
                d.friendly_url = makeFriendlyUrl(d.friendly_url)
                getByFriendlyUrl(d.friendly_url).then(e => {
                    if (e.length === 0) {
                        add(d).then(da => {
                            res.redirect('/cemese/posts?type=redirect&result=Post Creado Con Exito');
                        }).catch(err => {
                            res.send(err)
                        })
                    } else {
                        test(d);
                    }
                })
            }
            test(data);
        }
        
        veriryUnique(req, res, data)
        
    } catch (err) {
        res.send(err);
    }
});

router.post('/update', (req, res) => {
    try {
        const data = { ...req.body };
        data.friendly_url = nodeFriendlyUrl(data.title, 300)
        console.log(data)
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

module.exports = router;
