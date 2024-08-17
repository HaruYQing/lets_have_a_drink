const mysql = require("mysql2/promise");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "lets_have_a_drink",
};
const pool = mysql.createPool(dbConfig);

async function checkDbConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("MySQL連線成功");
    connection.release(); // 重要：釋放連接回到池中
  } catch (error) {
    console.error("MySQL連線失敗", error);
  }
}
checkDbConnection();

module.exports = pool;
