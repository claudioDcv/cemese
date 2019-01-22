var { db } = require('../config/db');
/*
CREATE TABLE public.images (
	id serial NOT NULL,
	"originalname" VARCHAR  NOT NULL,
	  "encoding" VARCHAR  NOT NULL,
	  "mimetype" VARCHAR  (50) NOT NULL,
	  "destination" VARCHAR  NOT NULL,
	  "filename" VARCHAR  NOT NULL,
	  "path" VARCHAR  NOT NULL,
	  "size" decimal NOT NULL,  
	CONSTRAINT images_pkey PRIMARY KEY (id)
);
*/

const columns = ['id', 'mimetype', 'filename', 'originalname'];
const table = 'images';
const columnsAdd = 'originalname, encoding, mimetype, destination, filename, path, size';

// Usage example:
exports.add = data => db.one('INSERT INTO images(' + columnsAdd + ') VALUES(${originalname}, ${encoding}, ${mimetype}, ${destination}, ${filename}, ${path}, ${size}) RETURNING id', data, a => a.id);
exports.getAll = () => db.query('SELECT * FROM ${table:name}', { table });
exports.getById = id => db.any('SELECT * FROM ${table:name} WHERE id = ${id}', { columns, table, id });
exports.deleteById = id => db.any('DELETE FROM ${table:name} WHERE id = ${id}', { columns, table, id });