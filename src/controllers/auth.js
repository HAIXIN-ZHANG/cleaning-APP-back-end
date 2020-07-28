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

    if (existingUser.role === 'client'){
        return res.status(201).json(
            {token, account, role: existingUser.role, clientId:existingUser.client._id}
            );
    }
    return res.status(201).json(
        {token, account, role: existingUser.role, tradieId:existingUser.tradie._id}
        );
}

module.exports = {
    loginUser
};