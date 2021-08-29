const router = require('express').Router();
const apiRoutes = require('./api');

const { User, Article } = require('../models');

router.use('/api', apiRoutes);

//Login route
router.get('/login', (req, res) => {
  // IF the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // Otherwise, render the login template
  res.render('login');
});

// Homepage articles
router.get('/', async (req, res) => {
  // Render template with Sequelize data
  const articleData = await Article.findAll({
    order: [['date_created', 'ASC']]
  });
  // Serialize the data
  const articles = articleData.map(articleData => articleData.get({ plain: true }));
  // Render the homepage passing in the serialized data
  res.render('homepage', {
    articles
  });
});

module.exports = router;