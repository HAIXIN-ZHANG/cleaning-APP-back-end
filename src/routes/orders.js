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

router.post('/', addOrder);
router.get('/;id', getOrderById);
router.get('/', getAllOrders);
router.put('/:id', updateOrderById);
router.patch('/:id/tradies/:id', updateOrderByTradie);
router.patch('/:id/clients/:id', updateOrderByClient);

module.exports = router;