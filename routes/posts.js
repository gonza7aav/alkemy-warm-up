const router = require('express').Router();
const { Post, Category } = require('../models');

// List
router.get('/', async (req, res) => {
  try {
    return res.status(200).json(
      await Post.findAll({
        attributes: ['id', 'title', 'image', 'creationDate'],
        include: [{ model: Category }],
        order: [['creationDate', 'DESC']],
      })
    );
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = router;
