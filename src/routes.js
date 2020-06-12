const express = require('express');

const userRoutes = require('./routes/users');
const clientRoutes = require('./routes/clients');
const tradieRoutes = require('./routes/tradies');
const serviceRoutes = require('./routes/services');
const orderRoutes = require('./routes/orders');


const router = express.Router();

router.use('/users', userRoutes);
router.use('/clients', clientRoutes);
router.use('/tradies', tradieRoutes);
router.use('/services', serviceRoutes);
router.use('/orders', orderRoutes);

module.exports = router;
