let myLibrary = [];

const table = document.querySelector("table");
const form = document.querySelector("form");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToTable(title, author, pages, read) {
  const row = document.createElement("tr");

  if (read === true) {
    read = "Read";
  } else {
    read = "Not read";
  }

  row.innerHTML = `
  <td>${title}</td>
  <td>${author}</td>
  <td>${pages}</td>
  <td>${read}</td>
  <td>Toggle</td>
  <td>Trash</td>
  `;
  table.appendChild(row);
}

function addLibrarytoTable(arr) {
  for (let book of arr) {
    let { title, author, pages, read } = book;
    addBookToTable(title, author, pages, read);
  }
}

addLibrarytoTable(myLibrary);

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  addBookToTable(title, author, pages, read);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const titleValue = title.value;
  const authorValue = author.value;
  const pagesValue = pages.value;
  const readValue = read.checked;
  addBookToLibrary(titleValue, authorValue, pagesValue, readValue);
});
