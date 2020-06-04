const express =  require('express');
const {
    addOrder,
    getOrder,
    getAllOrders,
    updateOrder,
    deleteOrder,
} = require("../controllers/orders");
const router = express.Router();

router.get('/', getAllOrders);
router.get('/:id', getOrder);
router.post('/', addOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

module.exports = router;