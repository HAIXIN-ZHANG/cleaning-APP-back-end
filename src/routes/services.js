const express =  require('express');
const {
    getServiceById,
    getAllServices,
    getServicesByName,
    getServicesByCleanType,
    updateServiceByTradieId,
    deleteServiceByTradieId,
} = require("../controllers/service");
const { authGuard,authGuardTradie } = require("../middleware/authGuard");

const router = express.Router();

router.get('/', authGuard, getAllServices);
router.get('/:serviceId', getServiceById);
router.get('/tradieName/search', getServicesByName);
router.get('/cleanType/search', getServicesByCleanType);
router.put('/:serviceId/tradies/:tradieId', authGuardTradie, updateServiceByTradieId);
router.delete('/:serviceId/tradies/:tradierId', authGuardTradie, deleteServiceByTradieId);

module.exports = router;