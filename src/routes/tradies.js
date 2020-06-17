const express =  require('express');
const {
    addTradie,
    getAllTradies,
    getTradiebyID,
    updateTradieById,
    updateTradieImage,
} = require("../controllers/tradies");
const router = express.Router();

router.post('/', addTradie);
router.get('/', getAllTradies);
router.get('/:tradieId', getTradiebyID);
router.put('/:tradieId', updateTradieById);
router.put('/:tradieId/image', updateTradieImage);

module.exports = router;