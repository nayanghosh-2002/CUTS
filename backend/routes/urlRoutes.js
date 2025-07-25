const express = require('express');
const router = express.Router();
const Url = require('../models/Url');
const { shortenUrl, redirectUrl, getUserUrls } = require('../controllers/urlController.js');
const authMiddleware = require('../middleware/authMiddleware.js');


router.post('/shorten', authMiddleware, shortenUrl);


router.get('/all', authMiddleware, getUserUrls);


router.get('/analytics/:shortId', async (req, res) => {
  const { shortId } = req.params;
  try {
    const url = await Url.findOne({ shortId });

    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    res.json({
      originalUrl: url.originalUrl,
      shortId: url.shortId,
      shortUrl: `${process.env.BASE_URL}/${url.shortId}`,
      clicks: url.clicks,
      createdAt: url.createdAt,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


router.get('/:shortId', redirectUrl);

module.exports = router;
