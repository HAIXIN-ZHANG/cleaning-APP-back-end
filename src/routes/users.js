const express = require('express')
const {
	addUser,
	getUser,
	getAllUsers,
	updateUser,
	updatePassword,
} = require('../controllers/users')
const { authGuard } = require('../middleware/authGuard')
const router = express.Router()

router.get('/', getAllUsers)
//router.get('/:id', authGuard, getUser);
router.get('/:id', getUser)
router.post('/', addUser)
router.put('/:id', authGuard, updateUser)
router.put('/:id/password', authGuard, updatePassword)

module.exports = router
