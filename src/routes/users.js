const express =  require('express');
const {
    addUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser,
} = require("../controllers/users");
const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.post('/', addUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;