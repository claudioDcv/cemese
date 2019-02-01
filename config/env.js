var session = require('express-session');
var RedisStore = require('connect-redis')(session);

exports.DB_STRING = 'postgres://cemese_user:1234qwer@localhost:5432/cemese'

// StVKrwZgEYpC7nAf6tAthYWobemcYTkvMCKpFbkA
// $2y$12$FXnxk7UPZ9UJ2PkGmroVe.4psjC4aAVDlseOkosrrhk7KKR6c92YC
// SESSION
const SECRET = '$2y$12$FXnxk7UPZ9UJ2PkGmroVe.4psjC4aAVDlseOkosrrhk7KKR6c92YC'

// BCRYP PSW
// FrankMario1988-24-05-Rojas-Tom&Jerry
exports.SALT = '$2a$10$4ZtpiLeIybWeoU2kHlCRiurh3n6ZGfnedWhoxEzBXmwbXAT.zhSAW'

exports.DATA_SITE = {
    title: 'Cemese Admin',
    title_forbidden: 'Forbidden',
}

// SESSION AND REDIS
/*
client An existing client
host Redis server hostname
port Redis server portno
socket Redis server unix_socket
url Redis server url
*/
const options = {};
exports.SESSION_CONFIG = session({
    key: 'user_sid',
    store: new RedisStore(options),
    secret: SECRET,
    proxy: true,
    resave: true,
    saveUninitialized: true,
    cookie: { expires: 600000 }
})