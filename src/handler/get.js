const books = require('../books');

const getBookResult = (bookData) => (
  bookData.map(({ id, name, publisher }) => ({ id, name, publisher }))
);

const getBooksByReadingHandler = (reading) => {
  const read = reading === '1';
  const booksFiltered = books.filter((book) => book.reading === read);
  const result = getBookResult(booksFiltered);

  return {
    status: 'success',
    data: {
      books: result,
    },
  };
};

const getBooksByFinishedHandler = (finished) => {
  const finish = finished === '1';
  const booksFiltered = books.filter((book) => book.finished === finish);
  const result = getBookResult(booksFiltered);

  return {
    status: 'success',
    data: {
      books: result,
    },
  };
};

const getBooksByNameHandler = (bookName) => {
  const booksFiltered = books.filter((book) => book.name.includes(bookName));
  const result = getBookResult(booksFiltered);

  return {
    status: 'success',
    data: {
      books: result,
    },
  };
};

const getAllBooksHandler = ({ query }) => {
  if ('reading' in query && (query.reading === '1' || query.reading === '0')) {
    return getBooksByReadingHandler(query.reading);
  }

  if ('finished' in query && (query.finished === '1' || query.finished === '0')) {
    return getBooksByFinishedHandler(query.finished);
  }

  if ('name' in query) {
    return getBooksByNameHandler(query.name);
  }

  const result = getBookResult(books);

  return {
    status: 'success',
    data: {
      books: result,
    },
  };
};

const getBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const book = books.filter((n) => n.id === id)[0];

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);

  return response;
};

module.exports = { getAllBooksHandler, getBookByIdHandler };
