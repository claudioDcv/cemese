const postsRouter = require('../modules/posts/index');
const imagesRouter = require('./images');
const uploadRouter = require('./upload');
const fileUpload = require('./fileUpload');
const displayImageRouter = require('./displayImage');
const categoriesRouter = require('./categories');

const { sessionChecker } = require("../auth/authentication"); // middleware for doing authentication

module.exports = app => {
    // sessionChecker
    app.use('/cemese/posts', sessionChecker, postsRouter);
    app.use('/cemese/galery', sessionChecker, imagesRouter); // sessionChecker
    app.use('/cemese/file-upload', sessionChecker, fileUpload); // sessionChecker
    app.use('/cemese/upload', sessionChecker, uploadRouter);
    app.use('/cemese/display/image', displayImageRouter);
    app.use('/cemese/categories', sessionChecker, categoriesRouter);
}