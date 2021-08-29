const router = require('express').Router();
const { User, Article } = require('../../models');


/* The '/api/users' endpoint */

// get all users
router.get('/', async (req, res) => {
    try {
      const data = await User.findAll({
        // include: [{ model: Article }]
      });
      res.status(200).json(data);
    } catch (err) {
      res.status(404).json(err);
    }
  });
  
  // get one user
  router.get('/:id', async (req, res) => {
    try {
      const data = await User.findOne({
        where: {
          id: req.params.id
        }
    });
      res.status(200).json(data);
    } catch (err) {
      res.status(404).json(err);
    }
  });

module.exports = router;