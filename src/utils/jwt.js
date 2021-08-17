const jwt = require('jsonwebtoken')

function generateToken({ account, role }) {
	const token = jwt.sign({ account, role }, 'secret', {
		expiresIn: '1h',
	})
	return token
}

function validateToken(token) {
	let decoded
	try {
		decoded = jwt.verify(token, 'secret')
	} catch (e) {
		console.log(e)
		return null
	}
	return decoded
}

module.exports = { generateToken, validateToken }
