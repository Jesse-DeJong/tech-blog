const router = require('express').Router();
const User = require('../../models/User');

router.get('/seedtest', async (req, res) => {
  // TODO: Render template with Sequelize data
  const userData = await User.findAll({
    attributes: {
      exclude: ['password']
    },
    order: [['username', 'ASC']]
  });
  
  console.log(userData);
  const users = userData.map(userData => userData.get({ plain: true }));
  console.log(users);

  res.render('homepage', {
    users
  });
});

module.exports = router;
