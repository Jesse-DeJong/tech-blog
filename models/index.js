// import models
const User = require('./User');
const Article = require('./Article');
const Comment = require('./Comment');
const ArticleComment = require('./ArticleComment');

// Article Relationships
Article.belongsTo(User, {
  foreignKey: 'author'
});

// Articles belongToMany Comments (through ArticleComment)
Article.belongsToMany(Comment, {
  through: ArticleComment,
  foreignKey: 'comment_id'
});

// Comments belongToMany Articles (through ArticleComment)
Comment.belongsToMany(Article, {
  through: ArticleComment,
  foreignKey: 'article_id'
});

module.exports = {
  User,
  Article,
  Comment,
  ArticleComment
};
