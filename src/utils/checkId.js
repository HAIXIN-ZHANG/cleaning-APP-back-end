function checkId(role, req, res) {
   
    if (!role.user || role.user._id.toString() !== req.user.id) {
        return res.status(401).json("Access denied");
    }
}

module.exports = checkId;
