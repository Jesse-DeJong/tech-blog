// import models
const User = require('./User');
const Article = require('./Article');
const Comment = require('./Comment');

// Article Relationships
Article.belongsTo(User, {
  foreignKey: 'author'
});

// Article.hasMany(Comment, {
//   foreignKey: 'user_comments'
// });

// Comment Relationships
Comment.hasOne(Article, {
  foreignKey: 'user_comments'
})

Comment.belongsTo(User, {
  foreignKey: 'username'
});

module.exports = {
  User,
  Article,
  Comment
};
