const bookProviders = require('../providers/books');

const getBooks = async ({ author, title, description }) => {
    const books = await bookProviders.getBooks({ author, title, description });
    return books;
};

module.exports = { getBooks };