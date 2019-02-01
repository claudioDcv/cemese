const indexRouter = require('../routes');
const siteRouter = require('../routes/site');

module.exports = (app) => {
    app.use('/cemese/site', siteRouter);
    app.use('/cemese/', indexRouter);
}