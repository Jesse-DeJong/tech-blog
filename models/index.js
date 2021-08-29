// import models
const User = require('./User');
const Article = require('./Article');

// Article(s) belongsTo User
Article.belongsTo(User, {
  foreignKey: 'author'
});

module.exports = {
  User,
  Article
};
