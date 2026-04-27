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

//update member
router.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (!found) {
    return res
      .status(400)
      .json({ msg: `No member with the id of ${req.params.id}` });
  }
  const updMember = req.body;
  members.forEach((member) => {
    if (member.id == parseInt(req.params.id)) {
      member.name = updMember.name ? updMember.name : member.name;
      member.email = updMember.email ? updMember.email : member.email;

      res.json({ msg: "Member updated", member });
    }
  });
});

//delete member
router.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (!found) {
    return res
      .status(400)
      .json({ msg: `No member with the id of ${req.params.id}` });
  }

  res.json({
    msg: "Member deleted",
    members: members.filter((member) => member.id !== parseInt(req.params.id)),
  });
});

module.exports = router;
