const router = require('express').Router();
const { Post, Category } = require('../models');
const postValidator = require('../middleware/validators/post');
const { checkImageURL } = require('../middleware/util');

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

    // Check if the post id is inside the database
    if (found.length === 0) {
      return res.status(404).json({ errors: ["The post wasn't found"] });
    }

    return res.status(200).json(found[0]);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// Create
router.post('/', postValidator.validateCreate(), async (req, res) => {
  try {
    // We ask this first because the image is optional
    if (typeof req.body.image !== 'undefined') {
      const result = await checkImageURL(req.body.image);

      if (!result.success) {
        return res
          .status(result.statusToSend)
          .json({ errors: [result.messageToSend] });
      }
    }

    // Check if the category id is inside the database
    const categoryFound = await Category.findByPk(req.body.category);
    if (categoryFound === null) {
      return res.status(404).json({ errors: ["The category wasn't found"] });
    }

    const newPost = await Post.create({
      ...req.body,
      id: undefined,
      creationDate: new Date(),
    });

    // Adds the relation with Category
    await newPost.setCategory(categoryFound);

    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// Delete
router.delete('/:id', postValidator.validateDelete(), async (req, res) => {
  try {
    // Search the post to delete
    const post = await Post.findByPk(req.params.id);

    // Check if the post id is inside the database
    if (post === null) {
      return res.status(404).json({ errors: ["The post wasn't found"] });
    }

    await Post.destroy({ where: { id: post.id } });

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = router;
