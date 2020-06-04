const express = require('express');

const userRoutes = require('./routes/users');
const router = express.Router();

router.use('/users', userRoutes);
module.exports = router;
