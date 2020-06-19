const User = require("../models/user");

const { generateToken } = require("../utils/jwt");
const User = require('../models/user');

async function loginUser(req, res) {
    const { account, password } = req.body;
    const existingUser = await User.findOne({ account }).exec();
    if (!existingUser) {
        return res.status(400).json('Invalid account or password');
    }
    if (existingUser.password !== password){
        return res.status(400).json('Invalid account or password');
    }
    const token = generateToken({account: existingUser._id, role: existingUser.role});
    return res.status(201).json({token, account});
}

module.exports = {
    loginUser
};