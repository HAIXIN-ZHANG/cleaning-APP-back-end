const express =  require('express');
const {
    getServiceById,
    getAllServices,
    getServicesByName,
    updateServiceByTradieId,
    deleteServiceByTradieId,
    addServiceToTradie,
} = require("../controllers/service");
const { authGuard,authGuardTradie } = require("../middleware/authGuard");

const router = express.Router();

router.get('/', authGuard, getAllServices);
router.get('/:serviceId', getServiceById);
router.get('/:serviceId', getServicesByName);
router.post('/', authGuardTradie,addServiceToTradie);
router.put('/:serviceId/tradies/:tradieId', authGuardTradie, updateServiceByTradieId);
router.delete('/:serviceId/tradies/:tradierId', authGuardTradie, deleteServiceByTradieId);

module.exports = router;