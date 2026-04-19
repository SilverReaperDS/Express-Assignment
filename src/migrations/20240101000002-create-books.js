'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Books', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      title: { type: Sequelize.STRING, allowNull: false },
      genre: { type: Sequelize.STRING, allowNull: true },
      publishedYear: { type: Sequelize.INTEGER, allowNull: true },
      authorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Authors', key: 'id' },
        onDelete: 'CASCADE'
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Books');
  }
};
