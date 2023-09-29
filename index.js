const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${read ? 'have read' : 'not read yet'}`
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function buildLibrary() {
  myLibrary.forEach(book => {
    const card = document.createElement('div');
    const cardTitle = document.createElement('h3');
    const cardAuthor = document.createElement('h4');
    const cardRead = document.createElement('div');
  })
}