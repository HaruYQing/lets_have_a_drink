// 還沒有修改為 pool 的狀態
exports.queryAsync = function (conn, sql, values) {
  return new Promise((resolve, reject) => {
    conn.query(sql, values, (err, result) => {
      if (err) {
        console.error("SQL Error: ", err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
