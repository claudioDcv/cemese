const express = require('express');
const router = express.Router();

const indexRouter = require('../routes');
const siteRouter = require('../routes/site');

const test = router

router.get('/', (req, res) => {
    res.render('modules/editor/view');
});

module.exports = (app) => {
    app.use('/cemese/site', siteRouter);
    app.use('/cemese/', indexRouter);
    app.use('/', test);
}

