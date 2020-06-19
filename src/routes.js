const express = require('express');

const userRoutes = require('./routes/users');
const clientRoutes = require('./routes/clients');
const tradieRoutes = require('./routes/tradies');
const serviceRoutes = require('./routes/services');
const orderRoutes = require('./routes/orders');
const authRoutes = require('./routes/auth');
const {authGuard} = require('./middleware/authGuard');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/clients', authGuard, clientRoutes);
router.use('/tradies', authGuard, tradieRoutes);
router.use('/services', authGuard, serviceRoutes);
router.use('/orders', authGuard, orderRoutes);

module.exports = router;