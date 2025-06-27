const express = require("express");
const {
  createGroup,
  getUserGroups,
  addMemberToGroup,
  removeMemberFromGroup,
} = require("../controllers/groupController");

const router = express.Router();

router.post("/create", createGroup);
router.get("/my-groups", getUserGroups);
router.put("/add-member", addMemberToGroup);
router.put("/remove-member", removeMemberFromGroup);

module.exports = router;