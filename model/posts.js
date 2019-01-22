var { db } = require('../config/db');
/*
CREATE TABLE public.posts (
	id serial NOT NULL,
  	"title" text NOT NULL,
  	"text" text NOT NULL,
  	"friendly_url" text NOT NULL,
  	"create_at" TIMESTAMP NOT null,
	CONSTRAINT post_pkey PRIMARY KEY (id)
);
*/
// 7W4C9P7A-Q4LADHGD-U5Z7GGCA
const columns = ['id', 'title', 'text', 'friendly_url', 'create_at'];
const table = 'posts';
const columnsAdd = 'title, text, friendly_url, create_at';
const columnsUpdate = 'title = ${title}, text = ${text}, friendly_url = ${friendly_url}';

// Usage example:
exports.add = data => db.one('INSERT INTO posts(' + columnsAdd + ') VALUES(${title}, ${text}, ${friendly_url}, ${create_at}) RETURNING id', data, a => a.id);
exports.getAll = () => db.query('SELECT * FROM ${table:name}', { table });
exports.getById = id => db.any('SELECT * FROM ${table:name} WHERE id = ${id}', { columns, table, id });
exports.getByFriendlyUrl = friendlyUrl => db.any('SELECT * FROM ${table:name} WHERE friendly_url = ${friendlyUrl}', { columns, table, friendlyUrl });
exports.deleteById = id => db.any('DELETE FROM ${table:name} WHERE id = ${id}', { columns, table, id });
// aun no implemente actualizacion de uri , friendly_url = ${friendly_url}
exports.updateById = data => db.one('UPDATE posts SET title = ${title}, text = ${text} WHERE id = ${id} RETURNING id', data);
/*
UPDATE table
SET column1 = value1,
    column2 = value2 ,...
WHERE
 condition;
*/