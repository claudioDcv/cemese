var { db } = require('../config/db');

// 7W4C9P7A-Q4LADHGD-U5Z7GGCA
const columns = ['id', 'title', 'text', 'friendly_url', 'create_at'];
const table = 'posts';
const columnsAdd = 'title, text, friendly_url, create_at';

exports.add = data => db.one('INSERT INTO posts(' + columnsAdd + ') VALUES(${title}, ${text}, ${friendly_url}, ${create_at}) RETURNING id', data, a => a.id);
exports.getAll = () => db.query('SELECT * FROM ${table:name}', { table });
exports.getById = id => db.any('SELECT * FROM ${table:name} WHERE id = ${id}', { columns, table, id });
exports.getByFriendlyUrl = friendlyUrl => db.any('SELECT * FROM ${table:name} WHERE friendly_url = ${friendlyUrl}', { columns, table, friendlyUrl });
exports.deleteById = id => db.any('DELETE FROM ${table:name} WHERE id = ${id}', { columns, table, id });
exports.updateById = data => db.one('UPDATE posts SET title = ${title}, text = ${text} WHERE id = ${id} RETURNING id', data);
exports.getLikeFriendlyUrl = friendlyUrl => db.any('select friendly_url from posts p where friendly_url like \'' + friendlyUrl + '%\' order by friendly_url', { friendlyUrl });
