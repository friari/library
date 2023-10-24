const form = document.querySelector('[data-form]');
const formContainer = document.querySelector('[data-form-container]');
const formToggleBtn = document.querySelector('[data-form-toggle]');
const mainContainer = document.querySelector('[data-library-main]');

const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${read ? 'have read' : 'not read yet'}`
  }
  this.changeReadStatus = function() {
    this.read = !this.read;
    return;
  }
}

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

  addBookToLibrary(currentBook);

  buildLibrary(mainContainer);

  formElem.reset();
  formToggle(formContainer);
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function buildLibrary(container) {
  myLibrary.forEach((book, index) => {
    buildCard(book, index, container);
  });
}

function removeBook(e, bookID, container) {
  const parentCard = e.target.closest('.book-card');
  let libraryItem = myLibrary.find(item => {
    return item.title === parentCard.dataset.title &&
            item.author === parentCard.dataset.author;
  });
  myLibrary.splice(myLibrary.indexOf(libraryItem), 1);
  container.querySelector(`#${bookID}`).remove();
}

function buildCardRead(book, index) {
  // Read Checkbox
  const cardReadContainer = document.createElement('div');
  cardReadContainer.className = 'book-card__read-container';

  const cardReadCheckbox = document.createElement('input');
  cardReadCheckbox.className = 'book-card__read-checkbox';
  cardReadCheckbox.setAttribute('type', 'checkbox');
  cardReadCheckbox.setAttribute('name', 'read');
  cardReadCheckbox.setAttribute('id', `read-book-${index}`)
  cardReadCheckbox.checked = book.read;
  cardReadCheckbox.addEventListener('change', () => {
    book.changeReadStatus();
    cardReadLabel.innerText = book.read ? "Read" : "Haven't read";
  });

  const cardReadLabel = document.createElement("label");
  cardReadLabel.className = 'book-card__read-label';
  cardReadLabel.setAttribute('for', `read-book-${index}`);
  cardReadLabel.innerText = book.read ? "Read" : "Haven't read";

  // Building Card Checkbox Elem
  cardReadContainer.appendChild(cardReadCheckbox);
  cardReadContainer.appendChild(cardReadLabel);

  return cardReadContainer;
}

function buildCard(book, index, container) {
  const bookID = book.title.toLowerCase().split(' ').concat(book.author.toLowerCase().split(' ')).join('-');
  if (document.getElementById(bookID)) return;

  const card = document.createElement('div');
  card.className = 'book-card';
  card.setAttribute('id', bookID);
  card.setAttribute('data-title', book.title);
  card.setAttribute('data-author', book.author);

  // Title
  const cardTitle = document.createElement('h3');
  cardTitle.className = 'book-card__title';
  cardTitle.innerText = book.title;

  // Author
  const cardAuthor = document.createElement('h4');
  cardAuthor.className = 'book-card__author';
  cardAuthor.innerText = book.author;

  // Pages
  const cardPages = document.createElement('p');
  cardPages.className = 'book-card__pages';
  cardPages.innerText = `Pages: ${book.pages}`;

  // Read Checkbox
  const cardReadContainer = buildCardRead(book, index);

  // Remove book button
  const cardRemoveBtn = document.createElement('button');
  cardRemoveBtn.innerText = "Remove book from library";
  cardRemoveBtn.addEventListener('click', (e) => removeBook(e, bookID, container));

  // Building Card
  card.appendChild(cardTitle);
  card.appendChild(cardAuthor);
  card.appendChild(cardPages);
  card.appendChild(cardReadContainer);
  card.appendChild(cardRemoveBtn);

  container.appendChild(card);
}

// Event Listeners
form.addEventListener('submit', onFormSubmit);
formToggleBtn.addEventListener('click', () => formToggle(formContainer));