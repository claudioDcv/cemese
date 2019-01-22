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
exports.publicAuthorize = function (req, res, next) {

    res.metadata = {
        isLogin: false,
        user: {}
    }
    const username = parseCookies(req)['x-api-token'] || '';
    // set user on-success
    getByIdUsername(username)
        .then(data => {
            if (data.length === 1) {
                res.metadata.isLogin = true
                res.metadata.user = data[0]
                next();
            } else {
                next()
            }
        })
        .catch(err => {
            res.status(403).json({ message: err }); // user is forbidden
        })
    // always continue to next middleware
    
}

exports.authorize = function (req, res, next) {

    res.metadata = {
        isLogin: false,
        user: {}
    }
    console.log('>> 6')
    console.log(parseCookies(req))
    console.log('>> 7')
    const username = parseCookies(req)['x-api-token'];
    // set user on-success
    getByIdUsername(username)
        .then(data => {
            if (data.length === 1) {
                res.metadata.isLogin = true
                res.metadata.user = data[0]
                next();
            } else {
                res.status(403).redirect('/cemese/forbidden'); // user is forbidden
            }
        })
        .catch(err => {
            res.status(403).json({ message: err }); // user is forbidden
        })
    // always continue to next middleware
}

exports.login = data => new Promise((res, rej) => {
    console.log('>> 2');
    getByIdUsername(data.username)
        .then(dat => {
            console.log('>> 3');
            if (dat.length === 1) {
                console.log('>> 4');
                res(dat[0]);
            } else {
                rej(dat);
            }
        })
        .catch(err => {
            rej(err);
        })
});
