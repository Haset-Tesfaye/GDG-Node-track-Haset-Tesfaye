
let books = [
  { id: 1, title: "Book One", price: 10 },
  { id: 2, title: "Book Two", price: 15 },
];

exports.getBooks = (req, res) => {
  res.status(200).json(books);
};

exports.getBookById = (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.status(200).json(book);
};

exports.createBook = (req, res) => {
  const { title, price } = req.body;
  const newBook = { id: books.length + 1, title, price };
  books.push(newBook);
  res.status(201).json(newBook);
};
