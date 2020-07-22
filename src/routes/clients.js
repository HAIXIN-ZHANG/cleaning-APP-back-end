const express =  require('express');
const {
    addClient,
    getAllClients,
    getClientByID,
    updateClientById,
    getAllOrdersById,
    updateClientImage,
} = require("../controllers/Clients");
const router = express.Router();
const { authGuard, authGuardClient } = require("../middleware/authGuard");

router.post('/', addClient);
router.get('/', getAllClients);
//router.get('/:clientId',authGuard, authGuardClient, getClientByID);
router.get('/:clientId', getClientByID);
//router.put('/:clientId',authGuard, authGuardClient, updateClientById);
router.put('/:clientId', updateClientById);
//router.put('/:clientId/orders',authGuard, authGuardClient, getAllOrdersById);
router.put('/:clientId/orders', getAllOrdersById);
//router.put('/:clientId/image',authGuard, authGuardClient, updateClientImage);
router.put('/:clientId/image', updateClientImage);

module.exports = router;