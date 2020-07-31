const express =  require('express');
const {
    addOrder,
    getOrderById,
    getAllOrders,
    updateOrderById,
    updateOrderByTradie,
    updateOrderByClient,
} = require("../controllers/orders");
const router = express.Router();
const { authGuard,authGuardTradie, authGuardClient } = require("../middleware/authGuard");

router.post('/',authGuardClient, addOrder);
router.get('/:id', getOrderById);
router.get('/',authGuard, getAllOrders);
router.put('/:id', updateOrderById);
router.patch('/:id/tradies/:id',authGuardTradie, updateOrderByTradie);
router.patch('/:id/clients/:id',authGuardClient, updateOrderByClient);

module.exports = router;