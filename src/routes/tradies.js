const express =  require('express');
const {
    addTradie,
    getAllTradies,
    getTradiebyID,
    updateTradieById,
    getAllServicesById,
    getAllOrdersById,
    getOrdersByStatus,
    addServiceByTradie,
    updateTradieImage,
} = require("../controllers/tradies");
const router = express.Router();
const { authGuardTradie, authGuard } = require("../middleware/authGuard");

router.post('/', addTradie);
router.get('/', getAllTradies);
router.get('/:tradieId', authGuard, getTradiebyID);
router.put('/:tradieId', authGuard, authGuardTradie, updateTradieById);
router.get('/:tradieId/services',authGuard, authGuardTradie, getAllServicesById);
router.post('/:tradieId/services', authGuard, authGuardTradie, addServiceByTradie);
router.get('/:tradieId/orders',authGuard, authGuardTradie, getAllOrdersById);
router.get('/:tradieId/orders/status',authGuard, authGuardTradie, getOrdersByStatus);
router.put('/:tradieId/image',authGuard, authGuardTradie, updateTradieImage);

module.exports = router;