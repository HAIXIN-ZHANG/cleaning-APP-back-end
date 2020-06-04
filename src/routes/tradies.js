const express =  require('express');
const {
    addTradie,
    getTradie,
    getAllTradies,
    updateTradie,
    deleteTradie,
} = require("../controllers/tradies");
const router = express.Router();

router.get('/', getAllTradies);
router.get('/:id', getTradie);
router.post('/', addTradie);
router.put('/:id', updateTradie);
router.delete('/:id', deleteTradie);

module.exports = router;