const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
app.use(express.static("public"));
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

const server = http.createServer(app);
const pool = require("./dbConfig");

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.write("Server Port: 8000");
  res.end();
});

app.post("/createEvent", async (req, res) => {
  // console.log("Received data:", req.body);

  try {
    const { user_name, email, deadline, remark, menu } = req.body;
    let saveFields = { user_name, email, deadline, remark };
    if (menu && menu.startsWith("data:image")) {
      // 從 Base64 字符串中提取實際的 base64 編碼部分
      const base64Data = menu.split(";base64,").pop();
      // 將 Base64 字符串轉換為 buffer
      saveFields["menu"] = Buffer.from(base64Data, "base64");
    } else {
      console.log("No valid image data received");
    }

    // console.log(saveFields["menu"]);

    let eid;

    const saveNewEventData = async function (pool, eventData) {
      const connection = await pool.getConnection();

      try {
        await connection.beginTransaction();

        const keys = Object.keys(eventData);
        const values = Object.values(eventData);
        const placeholders = keys.map(() => "?").join(",");

        const sql = `INSERT INTO events (${keys.join(
          ","
        )}) VALUES (${placeholders})`;

        // console.log("SQL Query:", sql);
        // console.log("SQL Values:", values);

        const [result] = await connection.query(sql, values);

        // 抓出 INSER 新資料列的 eid
        eid = result.insertId;

        await connection.commit();

        return {
          message: "saveNewEventData: 資料庫操作成功",
          affectedRows: result.affectedRows,
          changedRows: result.changedRows,
        };
      } catch (error) {
        await connection.rollback();
        console.error("詳細的數據庫錯誤: ", error);
        throw error;
      } finally {
        connection.release();
      }
    };

    if (Object.keys(saveFields).length > 0) {
      await saveNewEventData(pool, saveFields);

      // 回傳給客戶端的資料
      res.status(200).json({
        message: "恭喜恭喜",
        saveFields: Object.keys(saveFields),
        eid: eid, // 回傳 eid 供後續明細查詢用
      });
    }
  } catch (error) {
    console.error("詳細錯誤訊息: ", error);
    res.status(500).send({
      message: "An error occurred while updating event data",
      error: error.message,
    });
  }
});

const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
