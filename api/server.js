const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

app.post("/createEvent", (req, res) => {
  res.send("Submit your arrange here.");
});

const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
