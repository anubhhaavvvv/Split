const Group = require("../models/Group");

exports.createGroup = async (req, res) => {
  const { name, members } = req.body;
  const group = new Group({ name, members, createdBy: req.user._id });
  await group.save();
  res.status(201).json(group);
};

exports.getUserGroups = async (req, res) => {
  const groups = await Group.find({ members: req.user._id });
  res.json(groups);
};

exports.addMemberToGroup = async (req, res) => {
  const { groupId, userId } = req.body;
  const group = await Group.findById(groupId);
  if (!group.members.includes(userId)) {
    group.members.push(userId);
    await group.save();
  }
  res.json(group);
};

exports.removeMemberFromGroup = async (req, res) => {
  const { groupId, userId } = req.body;
  const group = await Group.findById(groupId);
  group.members = group.members.filter((id) => id.toString() !== userId);
  await group.save();
  res.json(group);
};
