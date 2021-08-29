const router = require('express').Router();
const apiRoutes = require('./api');

const { User, Article } = require('../models');

router.use('/api', apiRoutes);

// router.get('/', (req, res) => {
//   res.render('layouts/main')
// });

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
  // TODO: Render template with Sequelize data
  const articleData = await Article.findAll({
    order: [['date_created', 'ASC']]
  });
  
  
  const articles = articleData.map(articleData => articleData.get({ plain: true }));
  console.log(articles);

  res.render('homepage', {
    articles
  });
});

module.exports = router;