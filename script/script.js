const titleEl = document.getElementById('titleEl');
const authorEl = document.getElementById('authorEl');
const form = document.getElementById('my-form');
const bookList = document.querySelector('.book-list');

/* new code with class */
// let dataLink = Math.random();
let books = [];
class Books {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }

  renderBooks() {
    return `<span><q>${this.title}</q> By ${this.author}</span>
          <button class="remove-btn" id='${this.id}' type="button">Remove</button>
          `;
  }

  static appendBook(book) {
    let id = 5;
    if (books.length >= 1) {
      id = books[books.length - 1].id + 5;
    }
    book.id = id;
    books.push(book);
    localStorage.setItem('ourBooks', JSON.stringify(books));
  }

  static removeBook(id) {
    books = books.filter((book) => book.id !== Number(id));
    localStorage.setItem('ourBooks', JSON.stringify(books));
  }
}
const booksFromLocalStorage = JSON.parse(localStorage.getItem('ourBooks'));
function displayBooks() {
  // eslint-disable-next-line max-len
  const renderBooks = books.map((book) => new Books(book.title, book.author, book.id).renderBooks());
  bookList.innerHTML = renderBooks.join('');
  const removeButton = document.querySelectorAll('.remove-btn');
  removeButton.forEach((button) => {
    button.addEventListener('click', (e) => {
      const id = e.target.getAttribute('id');
      window.console.log(id);
      Books.removeBook(id);
      displayBooks();
    });
  });
}
if (booksFromLocalStorage) {
  books = booksFromLocalStorage;
  displayBooks();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = titleEl.value.replace(/^[ ]+|[ ]+$/g, '');
  const author = authorEl.value.replace(/^[ ]+|[ ]+$/g, '');
  if (!title || !author) {
    return;
  }
  const BookNew = new Books(title, author);
  Books.appendBook(BookNew);
  displayBooks();
  titleEl.value = '';
  authorEl.value = '';
});

/* end of class */
