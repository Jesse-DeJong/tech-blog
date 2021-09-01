const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ArticleComment extends Model {}

ArticleComment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    article_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'article',
        key: 'id'
      }
    },
    comment_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'comment',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'articlecomment',
  }
);

module.exports = ArticleComment;
