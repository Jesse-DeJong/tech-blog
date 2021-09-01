const router = require('express').Router();
const { User, Article, Comment } = require('../../models');

/* /api/comments endpoint */

// Get one Comment
router.get('/:id', async (req, res) => {
    try {
      const data = await Comment.findOne({
        where: {
          id: req.params.id
        },
        include: [
        { model: User },
        { model: Article }
    ]
      });
      res.status(200).json(data);
    } catch (err) {
      res.status(404).json(err);
    }
  });

module.exports = router;