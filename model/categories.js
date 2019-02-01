var { db } = require('../config/db');

const table = 'categories';
exports.getAll = () => db.query('SELECT * FROM ${table:name}', { table });