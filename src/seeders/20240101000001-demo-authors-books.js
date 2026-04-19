'use strict';
module.exports = {
  up: async (queryInterface) => {
    const now = new Date();
    await queryInterface.bulkInsert('Authors', [
      { name: 'George Orwell', bio: 'English novelist and essayist.', nationality: 'British', createdAt: now, updatedAt: now },
      { name: 'J.K. Rowling', bio: 'Author of the Harry Potter series.', nationality: 'British', createdAt: now, updatedAt: now }
    ]);
    await queryInterface.bulkInsert('Books', [
      { title: '1984', genre: 'Dystopian', publishedYear: 1949, authorId: 1, createdAt: now, updatedAt: now },
      { title: 'Animal Farm', genre: 'Political Satire', publishedYear: 1945, authorId: 1, createdAt: now, updatedAt: now },
      { title: "Harry Potter and the Philosopher's Stone", genre: 'Fantasy', publishedYear: 1997, authorId: 2, createdAt: now, updatedAt: now }
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Books', null, {});
    await queryInterface.bulkDelete('Authors', null, {});
  }
};
