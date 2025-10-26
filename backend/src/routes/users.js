const express = require('express');
const authMiddleware = require('../middleware/auth');
const { User } = require('../models');

const router = express.Router();

// Get current user profile
router.get('/me', authMiddleware, async (req, res, next) => {
  try {
    res.json({ user: req.user });
  } catch (error) {
    next(error);
  }
});

// Update profile
router.put('/me', authMiddleware, async (req, res, next) => {
  try {
    const { fullName, phone, profilePhoto } = req.body;
    
    await req.user.update({
      ...(fullName && { fullName }),
      ...(phone && { phone }),
      ...(profilePhoto && { profilePhoto })
    });

    res.json({ user: req.user });
  } catch (error) {
    next(error);
  }
});

// Get user by ID (public profile)
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'fullName', 'profilePhoto', 'rating', 'isVerified']
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
