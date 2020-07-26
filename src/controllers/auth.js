const User = require("../models/user");

const { generateToken } = require("../utils/jwt");

async function loginUser(req, res) {
    const { account, password } = req.body;
    const existingUser = await User.findById(account).exec();
    if (!existingUser) {
        return res.status(400).json('Invalid account or password1');
    }
    console.log(existingUser);
    if (!(await existingUser.validatePassword(password))){
       
        return res.status(400).json('Invalid account or password2');
    }
    const token = generateToken({account: existingUser._id, role: existingUser.role});
    return res.status(201).json({token, account});
}

module.exports = {
    loginUser
};