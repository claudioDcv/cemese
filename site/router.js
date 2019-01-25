var indexRouter = require('../routes');
var siteRouter = require('../routes/site');

module.exports = (app) => {
    app.use('/cemese/site', siteRouter);
    app.use('/cemese/', indexRouter);
}