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
// REDIS
/*
sudo systemctl enable redis-server.service
sudo /etc/init.d/redis-server enable

sudo vim /etc/redis/redis.conf
maxmemory 256mb
maxmemory-policy allkeys-lru

sudo /etc/init.d/redis-server restart
*/