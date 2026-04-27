const express = require("express");
const members = require("../../Members");

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

module.exports = router;
