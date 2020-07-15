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
const { authGuard, authGuardClient } = require("../middleware/authGuard");

router.post('/', addClient);
router.get('/', getAllClients);
router.get('/:clientId',authGuard, authGuardClient, getClientbyID);
router.put('/:clientId',authGuard, authGuardClient, updateClientById);
router.put('/:clientId/orders',authGuard, authGuardClient, getAllOrdersById);
router.put('/:clientId/image',authGuard, authGuardClient, updateClientImage);

module.exports = router;