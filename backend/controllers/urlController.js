const Url = require('../models/Url');
const { nanoid } = require('nanoid');

const baseUrl = process.env.BASE_URL || 'http://localhost:5000';

exports.shortenUrl = async (req, res) => {
  try {
    const userId = req.user?.userId; 
    const { originalUrl, customAlias, expiryDate } = req.body;

    let shortId;

    if (customAlias) {
      const exists = await Url.findOne({ shortId: customAlias });
      if (exists) {
        return res.status(400).json({ error: 'Custom alias already taken' });
      }
      shortId = customAlias;
    } else {
      shortId = nanoid(8);
    }

    const shortUrl = `http://localhost:5000/${shortId}`;

    await Url.create({ originalUrl, shortId, userId, expiryDate });

    res.status(201).json({ shortUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};



exports.redirectUrl = async (req, res) => {
  try {
    const { shortId } = req.params;
    const url = await Url.findOne({ shortId });

    if (url) {
      url.clicks += 1;
      await url.save();
      res.redirect(url.originalUrl);
    } else {
      res.status(404).send('URL not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};


exports.getUserUrls = async (req, res) => {
  try {
    
    console.log("Dashboard fetch request for userId:", req.user?.id); 

    const urls = await Url.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    console.log("URLs found in DB for this userId:", urls); 

    res.json(urls);
  } catch (err) {
    console.error("Error in getUserUrls:", err);
    res.status(500).json({ error: 'Server error' });
  }
};

