const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));

router.use('/tasks/', require('./taskRoutes'));

module.exports = router;
