var multer = require('multer');

const imageFilter = function (req, file, cb) {
    // accept image only
    if (!file.originalname.toLocaleLowerCase().match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const UPLOAD_PATH = 'uploads';

exports.UPLOAD_PATH = UPLOAD_PATH;
exports.upload = multer({ dest: `${UPLOAD_PATH}/`, fileFilter: imageFilter }); // multer configuration