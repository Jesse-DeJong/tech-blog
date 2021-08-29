const router = require('express').Router();
const { User, Article } = require('../../models');


/* The '/api/articles' endpoint */

// get all articles
router.get('/', async (req, res) => {
    try {
      const data = await Article.findAll({
        include: [{ model: User }]
      });
      res.status(200).json(data);
    } catch (err) {
      res.status(404).json(err);
    }
  });
  
  // get one article
  router.get('/:id', async (req, res) => {
    try {
      const data = await Article.findOne({
        where: {
          id: req.params.id
        },
        include: [{ model: User }]
      });
      res.status(200).json(data);
    } catch (err) {
      res.status(404).json(err);
    }
  });

module.exports = router;