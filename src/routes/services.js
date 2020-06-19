const express =  require('express');
const {

    getServiceById,
    getAllServices,
    updateServiceByTradieId,
    deleteServiceByTradieId,
    addServiceByTradieId,
} = require("../controllers/service");

const router = express.Router();
const {authGuardTradie} = require('../middleware/authGuard');

router.get('/', getAllServices);
router.get('/:serviceId', getServiceById);
router.post('/', authGuardTradie,addServiceByTradieId);
router.put('/:serviceId/tradies/:tradieId', authGuardTradie, updateServiceByTradieId);
router.delete('/:serviceId/tradies/:tradierId', authGuardTradie, deleteServiceByTradieId);

module.exports = router;