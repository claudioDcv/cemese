var { getByIdUsername } = require('../model/auth');
var { parseCookies } = require('../helpers/parseCookies');

// middleware for authentication
/*
module.exports = async function authorize(req, res, next) {
    const apiToken = req.headers['x-api-token'];
    
    // set user on-success
    request.user = await req.db.users.findByApiKey(apiToken);
       
    // always continue to next middleware
    next();
  }
  */
exports.sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        next();
    } else {
        res.redirect('/cemese');
    }
};

exports.login = data => new Promise((res, rej) => {
    getByIdUsername(data.username)
        .then(dat => {
            if (dat.length === 1) {
                res(dat[0]);
            } else {
                rej(dat);
            }
        })
        .catch(err => {
            rej(err);
        })
});
