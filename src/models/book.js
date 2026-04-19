'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: true
    },
    publishedYear: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Authors', key: 'id' }
    }
  }, {
    tableName: 'Books',
    timestamps: true
  });

  Book.associate = (models) => {
    Book.belongsTo(models.Author, {
      foreignKey: 'authorId',
      as: 'author'
    });
  };

  return Book;
};
