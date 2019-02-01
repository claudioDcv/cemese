var { getByIdUsername } = require('../model/auth');

exports.sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        next();
    } else {
        res.redirect('/cemese');
    }
};

exports.login = data => new Promise((resolve, reject) => {
    getByIdUsername(data.username)
        .then(dat => {
            if (dat.length === 1) {
                resolve(dat[0]);
            } else {
                reject(dat);
            }
        })
        .catch(err => reject(err))
});
