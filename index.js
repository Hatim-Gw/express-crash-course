const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");
const members = require("./routes/api/members");
//init express
const app = express();

//init middleware
//app.use(logger);

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.Port || 5050;

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/members", members);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
