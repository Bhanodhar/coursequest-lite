// routes/ingest.js

const express = require('express');
const router = express.Router();
const { ingestData } = require('../controllers/ingestController');
const { requireAuthToken } = require('../middlewares/auth');

router.post('/', requireAuthToken, ingestData);

module.exports = router;