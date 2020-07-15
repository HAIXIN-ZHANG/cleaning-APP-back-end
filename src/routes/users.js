const express =  require('express');
const {
    addUser,
    getUser,
    getAllUsers,
    updateUser,
} = require("../controllers/users");
const { authGuard } = require("../middleware/authGuard");
const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', authGuard, getUser);
router.post('/', addUser);
router.put('/:id', authGuard, updateUser);

module.exports = router;