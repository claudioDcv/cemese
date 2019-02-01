var { db } = require('../config/db');

const columns = ['id', 'mimetype', 'filename', 'originalname'];
const table = 'images';
const columnsAdd = 'originalname, encoding, mimetype, destination, filename, path, size';

exports.add = data => db.one('INSERT INTO images(' + columnsAdd + ') VALUES(${originalname}, ${encoding}, ${mimetype}, ${destination}, ${filename}, ${path}, ${size}) RETURNING id', data, a => a.id);
exports.getAll = () => db.query('SELECT * FROM ${table:name}', { table });
exports.getById = id => db.any('SELECT * FROM ${table:name} WHERE id = ${id}', { columns, table, id });
exports.deleteById = id => db.any('DELETE FROM ${table:name} WHERE id = ${id}', { columns, table, id });