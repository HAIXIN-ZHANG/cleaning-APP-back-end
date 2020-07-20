const jwt = require("jsonwebtoken");

function generateToken({ account, role }) {
    const token = jwt.sign({ account, role }, process.env.JWT_KEY, {
        expiresIn: "4h"
    });
    return token;
}

function validateToken(token) {
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_KEY);
    } catch (e) {
        return null;
    }
    return decoded;
}

module.exports = { generateToken, validateToken };