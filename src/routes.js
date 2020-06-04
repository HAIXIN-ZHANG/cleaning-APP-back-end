const express = require('express');

const userRoutes = require('./routes/users');
const courseRoutes = require('./routes/orders');
const router = express.Router();

router.use('/users', userRoutes);
router.use('/orders', courseRoutes);
module.exports = router;
