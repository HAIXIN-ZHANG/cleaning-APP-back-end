const express =  require('express');
const {
    addService,
    getService,
    getAllServices,
    updateService,
    deleteService,
} = require("../controllers/service");

const router = express.Router();

router.get('/', getAllServices);
router.get('/:id', getService);
router.post('/', addService);
router.put('/:id', updateService);
router.delete('/:id', deleteService);

module.exports = router;