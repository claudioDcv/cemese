var { db } = require('../config/db');
/*
CREATE TABLE public.menus (
	id serial NOT NULL,
	"menu_id" INT NOT NULL,
	  "title" text NOT NULL,
	  "url" text NOT NULL,
	  "order" INT NOT NULL,
	  "description" text NOT null,
	CONSTRAINT menus_pkey PRIMARY KEY (id)
);
*/

const columns = ['id', 'menu_id', 'title', 'url', 'order_position', 'description'];
const table = 'menus';
const columnsAdd = 'menu_id, title, url, order_position, description';

// Usage example:
// exports.add = data => db.one('INSERT INTO images(' + columnsAdd + ') VALUES(${originalname}, ${encoding}, ${mimetype}, ${destination}, ${filename}, ${path}, ${size}) RETURNING id', data, a => a.id);
exports.getAllByMenuId = menuId => db.query('SELECT * FROM ${table:name} WHERE menu_id = ${menuId} ORDER BY order_position', { table, menuId });
// exports.getById = id => db.any('SELECT * FROM ${table:name} WHERE id = ${id}', { columns, table, id });
// exports.deleteById = id => db.any('DELETE FROM ${table:name} WHERE id = ${id}', { columns, table, id });