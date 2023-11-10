class Book {
  constructor(title, author,  pages, read, counterVal) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.bookId = title.toLowerCase().split(" ").concat(author.toLowerCase().split(" ")).join("-");
  }

  info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${read ? 'have read' : 'not read yet'}`
  }

  changeReadStatus() {
    this.read = !this.read;
  }

  buildCard(index, library) {
    if (document.getElementById(this.bookId)) return;

    const card = document.createElement('div');
    const cardTitle = document.createElement('h3');
    const cardAuthor = document.createElement('h4');
    const cardPages = document.createElement('p');
    const cardReadContainer = document.createElement('div');
    const cardReadCheckbox = document.createElement('input');
    const cardReadLabel = document.createElement("label");
    const cardRemoveBtn = document.createElement('button');

    card.setAttribute('id', this.bookId);
    cardReadCheckbox.setAttribute('type', 'checkbox');
    cardReadCheckbox.setAttribute('name', 'read');
    cardReadCheckbox.setAttribute('id', `read-book-${index}`);
    cardReadLabel.setAttribute('for', `read-book-${index}`);

    card.className = 'book-card';
    cardTitle.className = 'book-card__title';
    cardAuthor.className = 'book-card__author';
    cardPages.className = 'book-card__pages';
    cardReadContainer.className = 'book-card__read-container';
    cardReadCheckbox.className = 'book-card__read-checkbox';
    cardReadLabel.className = 'book-card__read-label';

    cardTitle.innerText = this.title;
    cardAuthor.innerText = this.author;
    cardPages.innerText = `Pages: ${this.pages}`;
    cardReadCheckbox.checked = this.read;
    cardReadLabel.innerText = this.read ? "Read" : "Haven't read";
    cardRemoveBtn.innerText = "Remove book from library";

    cardReadContainer.appendChild(cardReadCheckbox);
    cardReadContainer.appendChild(cardReadLabel);
    card.appendChild(cardTitle);
    card.appendChild(cardAuthor);
    card.appendChild(cardPages);
    card.appendChild(cardReadContainer);
    card.appendChild(cardRemoveBtn);

    cardReadCheckbox.onchange = () => {
      this.changeReadStatus();
      cardReadLabel.innerText = this.read ? "Read" : "Haven't read";
    }

    cardRemoveBtn.onclick = () => { 
      library.removeBook(this);
      document.getElementById(this.bookId).remove();
    }

    return card;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    if (this.hasBook(book)) return;
    this.books.push(book);
  }

  removeBook( book ) {
    let bookToRemove = this.hasBook(book);
    return bookToRemove ? this.books.splice(bookToRemove, 1) : false;
  }

  hasBook(book) {
    return this.books.find(item => item === book);
  }
}

const myLibrary = new Library();

const form = document.querySelector('[data-form]');
const formContainer = document.querySelector('[data-form-container]');
const formToggleBtn = document.querySelector('[data-form-toggle]');
const mainContainer = document.querySelector('[data-library-main]');

function formToggle(formContainer) {
  if (formContainer.classList.contains('hidden')) {
    formContainer.classList.remove('hidden');
    formToggleBtn.classList.add('hidden');
    return;
  }

  formToggleBtn.classList.remove('hidden');
  formContainer.classList.add('hidden');
}

function onFormSubmit(e) {
  e.preventDefault();
  const formElem = e.target;
  const formData = new FormData(formElem);

  const bookTitle = formData.get('title');
  const bookAuthor = formData.get('author');
  const bookPages = formData.get('pages');
  const haveRead = formData.get('read') ? true : false;

  const currentBook = new Book(bookTitle, bookAuthor, bookPages, haveRead);

  myLibrary.addBook(currentBook);

  buildLibrary(mainContainer);

  formElem.reset();
  formToggle(formContainer);
}

function buildLibrary(container) {
  myLibrary.books.forEach((book, index) => {
    let card = book.buildCard(index, myLibrary);
    if (!card) return;
    container.appendChild(card);
  });
}

// Event Listeners
form.onsubmit = onFormSubmit;
formToggleBtn.onclick = () => formToggle(formContainer);