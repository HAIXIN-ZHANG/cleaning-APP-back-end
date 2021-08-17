function checkId(role, req, res) {
	if (!role.user || role.user.toString() !== req.user.account) {
		return res.status(401).json('Access denied')
	}
}

module.exports = checkId
