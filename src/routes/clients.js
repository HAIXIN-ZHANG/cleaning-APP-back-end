const express =  require('express');
const {
    addClient,
    getAllClients,
    getClientbyID,
    updateClientById,
    getAllOrdersById,
    updateClientImage,
} = require("../controllers/Clients");
const router = express.Router();

router.post('/', addClient);
router.get('/', getAllClients);
router.get('/:clientId', getClientbyID);
router.put('/:clientId', updateClientById);
router.put('/:clientId/orders', getAllOrdersById);
router.put('/:clientId/image', updateClientImage);

module.exports = router;