const router = require('express').Router();
const { User, Article, Comment, ArticleComment } = require('../../models');

/* /api/comments endpoint */

// get all comments
router.get('/', async (req, res) => {
    try {
      const data = await Comment.findAll({
        include: [{ model: Article, through: ArticleComment }]
      });
      res.status(200).json(data);
    } catch (err) {
      res.status(404).json(err);
    }
  });

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

// CREATE a new Comment
router.post('/addComment', async (req, res) => {
    try {
        // Prepare the userdata for the Comment Model
        // Pull username from the session
        const commentObject = {
            contents: req.body.contents,
            article_id: req.body.articleId,
            author: req.session.user 
        };
    // Create a new comment from the formatted object
      const newComment = await Comment.create(commentObject)
      res.status(200).json(newComment);
    } catch (error) {
      res.status(400).json(error);
    }
  });

module.exports = router;