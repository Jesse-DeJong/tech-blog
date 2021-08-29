const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.get('/', (req, res) => {
  res.render('layouts/main')
});

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

module.exports = router;