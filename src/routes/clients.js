const express =  require('express');
const {
    addClient,
    getClient,
    getAllClients,
    updateClient,
    deleteClient,
} = require("../controllers/clients");

const router = express.Router();

router.get('/', getAllClients);
router.get('/:id', getClient);
router.post('/', addClient);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);

module.exports = router;