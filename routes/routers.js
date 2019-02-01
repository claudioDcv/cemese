const postsRouter = require('./posts');
const imagesRouter = require('./images');
const uploadRouter = require('./upload');
const displayImageRouter = require('./displayImage');
const categoriesRouter = require('./categories');

const { sessionChecker } = require("../auth/authentication"); // middleware for doing authentication

module.exports = app => {
    app.use('/cemese/posts', sessionChecker, postsRouter);
    app.use('/cemese/galery', sessionChecker, imagesRouter);
    app.use('/cemese/upload', sessionChecker, uploadRouter);
    app.use('/cemese/display/image', displayImageRouter);
    app.use('/cemese/categories', sessionChecker, categoriesRouter);
}