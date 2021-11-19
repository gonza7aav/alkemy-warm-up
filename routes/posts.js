const router = require('express').Router();
const postValidator = require('../middleware/validators/post');
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

// Search
router.get('/:id', postValidator.validateSearch(), async (req, res) => {
  try {
    // We use findAll instead of findByPK because the last one
    // can't include (join) other table. We won't have problem
    // since id is a primary key (unique), then this will
    // return an array with a single element or an empty one
    const found = await Post.findAll({
      include: [{ model: Category }],
      where: {
        id: req.params.id,
      },
    });

    // The id has a valid type but it isn't in the database
    if (found.length === 0) {
      return res.status(404).json({ errors: ["The post wasn't found"] });
    }

    return res.status(200).json(found[0]);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = router;
