// import models
const User = require('./User');
const Article = require('./Article');
const Comment = require('./Comment');

// Article Relationships
Article.belongsTo(User, {
  foreignKey: 'author'
});

// Comment Relationships
Comment.belongsTo(Article, {
  foreignKey: 'article_id'
});

Comment.belongsTo(User, {
  foreignKey: 'username'
});

module.exports = {
  User,
  Article,
  Comment
};
