const express = require("express");
const members = require("../../Members");
const { randomUUID } = require("crypto");
const { stat } = require("fs");

//init express
const router = express.Router();

router.get("/", (req, res) => {
  res.json(members);
});

//get single member
router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (!found) {
    return res
      .status(400)
      .json({ msg: `No member with the id of ${req.params.id}` });
  }
  res.json(members.filter((member) => member.id === parseInt(req.params.id)));
});

//create member
router.post("/", (req, res) => {
  const newMember = {
    id: randomUUID(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };
  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "Please include a name and email" });
  }
  members.push(newMember);
  res.json(members);
});

module.exports = router;
