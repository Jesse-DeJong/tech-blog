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

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    // Establish the user as logged in
    req.session.save(() => {
      req.session.loggedIn = true});

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

  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    // Check the DB for the user entered email address
    const userData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    // If no match is found end the request and send an error message
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }
    // Confirm the entered password matches in the DB
    const validPassword = await userData.checkPassword(req.body.password);
    
    // If it doesn't match end the request and send an error message
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }
    // As an email/password combo has returned successfully flag the user as logged in
    req.session.save(() => {
      req.session.loggedIn = true,
      req.session.user = userData.username;
      res.json(userData);
    });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
});

// Logout
router.post('/logout', (req, res) => {
  // When the user logs out, the session is destroyed
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;