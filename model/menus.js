var { db } = require('../config/db');

const table = 'menus';

exports.getAllByMenuId = menuId => db.query('SELECT * FROM ${table:name} WHERE menu_id = ${menuId} ORDER BY order_position', { table, menuId });