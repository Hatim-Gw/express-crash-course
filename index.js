const express = require("express");
const path = require("path");
const members = require("./Members");
const logger = require("./middleware/logger");

//init express
const app = express();

//init middleware
//app.use(logger);

const PORT = process.env.Port || 5050;

app.get("/api/members", (req, res) => {
  res.json(members);
});

//get single member
app.get("/api/members/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (!found) {
    return res
      .status(400)
      .json({ msg: `No member with the id of ${req.params.id}` });
  }
  res.json(members.filter((member) => member.id === parseInt(req.params.id)));
});

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
