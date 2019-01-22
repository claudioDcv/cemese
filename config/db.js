var pgp = require("pg-promise")(/*options*/);
var { DB_STRING } = require('./env');
var db = pgp(DB_STRING);

// SET timezone = 'America/Santiago';
// sudo su
// service postgresql start
exports.db = db;
exports.dbTest = () => new Promise((resolve, reject) => {
    db.one("SELECT $1 AS value", 'DB ok')
        .then(function (data) {
            resolve(data.value);
        })
        .catch(function (error) {
            reject(error);
        });
});