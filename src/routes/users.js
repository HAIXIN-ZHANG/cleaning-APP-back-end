const express =  require('express');
const {
    addUser,
    getUser,
    getAllUsers,
    updateUser,
} = require("../controllers/users");
const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.post('/', addUser);
router.put('/:id', updateUser);

module.exports = router;