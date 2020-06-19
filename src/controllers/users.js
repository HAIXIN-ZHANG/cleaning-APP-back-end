const User = require('../models/user');
const { generateToken } = require("../utils/jwt");

async function addUser(req, res){
    const { account, password, firstName, 
        lastName, role } = req.body;
    const existUser = await User.findById(account).exec();
    if (existUser) {
        return res.status(400).json('User exist');
    }
    const user = new User ({
        account, 
        password,
        firstName, 
        lastName,  
        role,
    });
    await user.save();
    return res.status(201).json(user);
};

async function getUser(req, res) {
    const { account } = req.params; 
    const user = await User.findById(account).exec();
    if (!user) {
        return res.status(404).json('User not found');
    }
    return res.status(200).json(user);
};

async function getAllUsers(req, res) {
    const users = await User.find().exec();
    return res.status(200).json(users);
};

async function updateUser(req, res) {
    const { account } = req.params;
    const {password, firstName, lastName, role} = req.body;
    const updatedUser = await findByIdAndUpdate(
        account,
        {password, firstName, lastName, role},
        { new: true }
    ).exec();

    if (!updatedUser) {
        return res.status(404).json('User not found')
    }
    return res.status(200).json(updatedUser);
};

module.exports = {
    addUser,
    getUser,
    getAllUsers,
    updateUser,
}