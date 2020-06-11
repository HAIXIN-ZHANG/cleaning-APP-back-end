const express =  require('express');
const {
    addTradie,
    getTradie,
    getAllTradies,
    updateTradie,
    deleteTradie,
    addService,
    updateService,
    deleteService,
} = require("../controllers/tradies");
const router = express.Router();

router.get('/', getAllTradies);
router.get('/:id', getTradie);
router.post('/', addTradie);
router.put('/:id', updateTradie);
router.delete('/:id', deleteTradie);
router.post('/:id/services/:id', addService);
router.put('/:id/services/:id', updateService);
router.delete('/:id/services/:id', deleteService);

module.exports = router;