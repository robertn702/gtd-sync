module.exports = {
  initializeTable(db, tableName, createClause) {
    return db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'`, (err, rows) => {
      if (err) {
        console.log('[db] err: ', err);
      } else if (!rows) {
        db.run(`CREATE TABLE ${tableName} (${createClause})`, (err) => {
          if (err) {
            console.log(`[db] error creating "${tableName}" table: `, err);
          } else {
            console.log(`[db] SQL Table "${tableName}" initialized`);
          }
        });
      } else {
        console.log(`[db] SQL Table "${tableName}" already initialized`);
      }
    });

  }
}
