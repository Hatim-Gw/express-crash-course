const express = require("express");
const path = require("path");
const members = require("./Members");

const app = express();

// meddleware, always use next to move to the next middleware
const logger = (req, res, next) => {
  console.log(
    `${req.protocol}||(req.protocol) ||://${req.get("host")} ||(req.get"host") ||${req.originalUrl}`,
  );
  next();
};

//init middleware
app.use(logger);

const PORT = process.env.Port || 5050;

app.get("/api/members", (req, res) => {
  res.json(members);
});

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
