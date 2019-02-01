var { db } = require('../config/db');

exports.getByIdUsername = username => db.any('select * from "role" inner join account_role on account_role.role_id = "role".role_id inner join account on account.user_id = account_role.user_id where username = ${username}', { username });