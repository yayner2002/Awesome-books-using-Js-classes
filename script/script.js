const titleEl = document.getElementById('titleEl');
const authorEl = document.getElementById('authorEl');
const form = document.getElementById('my-form');
const bookList = document.querySelector('.book-list');
const listLink = document.querySelector('.list-link');
const addLink = document.querySelector('.add-link');
const contactLink = document.querySelector('.contact-link');
const listBooksContainer = document.querySelector('.list-of-books');
const addBookContainer = document.querySelector('.add-book-container');
const contactConstainer = document.querySelector('.contact-info-container');
const time = document.querySelector('.time');
function displayDateTime() {
  const date = new Date();
  // date = date.toDateString();
  time.innerHTML = date;
}
window.addEventListener('load', () => {
  setInterval(displayDateTime, 1000);
});
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
    return `<div class="list-block"><p><q>${this.title}</q> By ${this.author} </p>
          <button class="remove-btn" id='${this.id}' type="button">Remove</button></div>
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

/** Link click events */

addLink.addEventListener('click', () => {
  listBooksContainer.classList.add('hidden');
  contactConstainer.classList.add('hidden');
  addBookContainer.classList.remove('hidden');
});

contactLink.addEventListener('click', () => {
  contactConstainer.classList.remove('hidden');
  listBooksContainer.classList.add('hidden');
  addBookContainer.classList.add('hidden');
});

listLink.addEventListener('click', () => {
  listBooksContainer.classList.remove('hidden');
  contactConstainer.classList.add('hidden');
  addBookContainer.classList.add('hidden');
});