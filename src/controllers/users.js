const User = require("../models/user");
const { generateToken } = require("../utils/jwt");

async function addUser(req, res) {
  const { account, password, firstName, lastName, role } = req.body;

  const existUser = await User.findById(account).exec();
  if (existUser) {
    return res.status(400).json("User exist");
  }

  const user = new User({
    account,
    password,
    firstName,
    lastName,
    role,
  });

  await user.hashPassword();
  await user.save();
  console.log(user.account);
  const token = generateToken({ account: user.account, role: user.role });
  return res.status(201).json({
    account: user.account,
    role: user.role,
    token,
  });
  // return res.status(201).json(user);
}

async function getUser(req, res) {
  const { id } = req.params;

  // const user = await User.findById(req.params.id);
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json("User not found");
  }
  return res.status(200).json(user);
}

async function getAllUsers(req, res) {
  const users = await User.find().exec();
  return res.status(200).json(users);
}
async function updateUser(req, res) {
  const { account } = req.params;
  const { password, firstName, lastName, role } = req.body;
  const updatedUser = await findById(account).exec();

  if (!updatedUser) {
    return res.status(404).json("User not found");
  }
  if (!(await updatedUser.validatePassword(password))) {
    return res.status(400).json("Invalid password");
  }
  updatedUser.firstName = firstName;
  updatedUser.lastName = lastName;
  updatedUser.role = role;
  await updatedUser.save();
  const token = generateToken({
    id: updatedUser.account,
    role: updatedUser.role,
  });
  return res.status(200).json({
    id: updatedUser.account,
    role: updatedUser.role,
    token,
  });
}

async function updatePassword(req, res) {
  const { account } = req.params;
  const { password, newPassword, doubleInputPassword } = req.body;
  const updatedUser = await findById(account).exec();

  if (!updatedUser) {
    return res.status(404).json("User not found");
  }
  if (!(await updatedUser.validatePassword(password))) {
    return res.status(400).json("Invalid password");
  }
  if (
    !newPassword ||
    !doubleInputPassword ||
    newPassword !== doubleInputPassword
  ) {
    return res.status(400).json("New passwords entered twice are inconsistent");
  }
  updatedUser.password = newPassword;
  await updatedUser.hashPassword();
  await updatedUser.save();
  const token = generateToken({
    id: updatedUser.account,
    role: updatedUser.role,
  });
  return res.status(200).json({
    id: updatedUser.account,
    role: updatedUser.role,
    token,
  });
}

module.exports = {
  addUser,
  getUser,
  getAllUsers,
  updateUser,
  updatePassword,
};
