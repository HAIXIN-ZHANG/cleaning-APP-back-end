const express = require('express');

const userRoutes = require('./routes/users');
const courseRoutes = require('./routes/orders');
const tradieRoutes = require('./routes/tradies');
const router = express.Router();

router.use('/users', userRoutes);
router.use('/orders', courseRoutes);
router.use('/tradies', tradieRoutes);
module.exports = router;
