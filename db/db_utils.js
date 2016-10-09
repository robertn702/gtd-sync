const _ = require('lodash');

module.exports = {
  initializeTable(db, tableName, createClause, next) {
    return db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'`, (err, rows) => {
      if (err) {
        console.log('[db] err: ', err);
      } else if (!rows) {
        db.run(`CREATE TABLE ${tableName} (${createClause})`, (err) => {
          if (err) {
            console.log(`[db] error creating "${tableName}" table: `, err);
          } else {
            console.log(`[db] SQL Table "${tableName}" initialized`);
            if (_.isFunction(next)) {
              next(db)
            }
          }
        });
      } else {
        console.log(`[db] SQL Table "${tableName}" already initialized`);
      }
    });

  }
}
