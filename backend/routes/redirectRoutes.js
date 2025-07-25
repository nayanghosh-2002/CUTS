const express = require('express');
const router = express.Router();
const { redirectUrl } = require('../controllers/urlController');

router.get('/:shortId', redirectUrl);

module.exports = router;
