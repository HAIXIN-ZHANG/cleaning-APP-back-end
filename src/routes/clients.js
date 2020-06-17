const express =  require('express');
const {
    addClient,
    getAllClients,
    getClientbyID,
    deleteClientById,
    updateClientImage,
} = require("../controllers/Clients");
const router = express.Router();

router.post('/', addClient);
router.get('/', getAllClients);
router.get('/:clientId', getClientbyID);
router.delete('/:clientId', deleteClientById);
router.put('/:clientId/image', updateClientImage);

module.exports = router;